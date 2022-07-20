print(
    "Start #################################################################"
);

db.createUser({
    user: "matteo",
    pwd: "!64vEpMRTGE^Yv",
    roles: [
        {
            role: "readWrite",
            db: "vanilla",
        },
    ],
});

print("END #################################################################");