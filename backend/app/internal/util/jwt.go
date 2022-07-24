package util

import (
	"crypto"
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"io/ioutil"
	"time"
)

// Issuer handles JWT issuing
type Issuer struct {
	key crypto.PrivateKey
}

// NewIssuer creates a new issuer by parsing the given path as a ed25519 private key
func NewIssuer(config Config) (*Issuer, error) {
	keyBytes, err := ioutil.ReadFile(config.PrivateKeyPath)
	if err != nil {
		panic(fmt.Errorf("unable to read private key file: %w", err))
	}

	key, err := jwt.ParseEdPrivateKeyFromPEM(keyBytes)
	if err != nil {
		return nil, fmt.Errorf("unable to parse as ed private key: %w", err)
	}

	return &Issuer{
		key: key,
	}, nil
}

// IssueToken issues a new token for the given user with the given roles
func (i *Issuer) IssueToken(config Config, user string, roles []string) (string, error) {
	now := time.Now()
	token := jwt.NewWithClaims(&jwt.SigningMethodEd25519{}, jwt.MapClaims{
		// standardized claims
		"aud": "api",
		"nbf": now.Unix(),
		"iat": now.Unix(),
		"exp": now.Add(time.Minute).Unix(),
		"iss": config.GrpcServerAddress,

		// user is custom claim for the validated user
		"user": user,

		// roles is a list of roles attached to the user
		// it shows that claims can have more complex value types
		"roles": roles,
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString(i.key)
	if err != nil {
		return "", fmt.Errorf("unable to sign token: %w", err)
	}

	return tokenString, nil
}

// Validator does parsing and validation of JWT token
type Validator struct {
	key crypto.PublicKey
}

// NewValidator returns a new validator by parsing the given file path as a ed25519 public key
func NewValidator(config Config) (*Validator, error) {
	keyBytes, err := ioutil.ReadFile(config.PublicKeyPath)
	if err != nil {
		return nil, fmt.Errorf("unable to read public key file: %w", err)
	}

	key, err := jwt.ParseEdPublicKeyFromPEM(keyBytes)
	if err != nil {
		return nil, fmt.Errorf("unable to parse as ed private key: %w", err)
	}

	return &Validator{
		key: key,
	}, nil
}

// GetToken attempts to get a token from the given string
// it validates both the signature and claim and returns nil and an err if invalid
func (v *Validator) GetToken(tokenString string) (*jwt.Token, error) {
	// jwt.Parse also does signature verify and claim validation
	token, err := jwt.Parse(
		tokenString,
		// the func below is to help figure
		// out if the token came from a key we trust
		// our implementation assumes a single
		// trusted private key
		//
		// NOTE: this is where you would handle
		// key rotation or multiple trusted issuers
		func(token *jwt.Token) (interface{}, error) {
			// Check to see if the token uses
			// the expected signing method
			if _, ok := token.Method.(*jwt.SigningMethodEd25519); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}

			// return the single public key we trust
			return v.key, nil
		})
	if err != nil {
		return nil, fmt.Errorf("unable to parse token string: %w", err)
	}

	// now manually validate the audience from the claims
	aud, ok := token.Claims.(jwt.MapClaims)["aud"]
	if !ok {
		return nil, fmt.Errorf("token had no audience claim")
	}

	// check for our expected audience from our issuer
	if aud != "api" {
		return nil, fmt.Errorf("token had the wrong audience claim")
	}

	return token, nil
}
