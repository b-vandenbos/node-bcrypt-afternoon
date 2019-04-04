module.exports = {
    dragonTreasure: async (req, res) => {
        let db = req.app.get('db');
        let getTreasure = await db.get_dragon_treasure(1);
        res.status(200).send(getTreasure);
    },
    getUserTreasure: async (req, res) => {
        let db = req.app.get('db');
        let {id} = req.session.user;
        let getUserTreasure = await db.get_user_treasure(id);
        res.status(200).send(getUserTreasure);
    },
    addMyTreasure: async (req, res) => {
        let {treasureURL} = req.body;
        let {id} = req.session.user;
        let db = req.app.get('db');
        let userTreasure = await db.add_user_treasure(treasureURL, id);
        res.status(200).send(userTreasure);
    },
    getAllTreasure: async (req, res) => {
        let db = req.app.get('db');
        let result = await db.get_all_treasure();
        res.status(200).send(result);
    }
}