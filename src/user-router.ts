
import User from './user'
import express from 'express';
const router = express.Router();

function makeResponse(value:any, userId:number, res: express.Response, next_max_id: string = ""){
  if(!value)
    if(next_max_id) return res.status(404).json({"userId": userId, "next_max_id": next_max_id})
    else return res.status(404).json({"userId": userId})
  else res.send(value)
  
}
router.get("/:userId", async (req, res) => {
  let userId: number = req.params["userId"];
  User.getRawById(userId)
  .then(value=> makeResponse(value, userId, res));
  //res.send(userResponse)
});

router.get("/:userId/media", async (req, res) => {
  let userId: number = req.params["userId"];
  let next_max_id: string = req.query["next_max_id"];
  User.userMedia(userId, next_max_id)
  .then(value=> makeResponse(value, userId, res,next_max_id))
});

router.get("/:userId/followers", async (req, res) => {
  let userId: number = req.params["userId"];
  let next_max_id: string = req.query["next_max_id"];
   User.getUserFollowers(userId, next_max_id)
   .then(value=> makeResponse(value, userId, res,next_max_id))
});

router.get("/:userId/following", async (req, res) => {
  let userId: number = req.params["userId"];
  let next_max_id: string = req.query["next_max_id"];
  User.getUserFollowing(userId, next_max_id)
  .then(value=> makeResponse(value, userId, res,next_max_id))
});

router.get("/:username/resolve", async (req, res) => {
  let userId: string = req.params["username"];
  User.resolveUsername(userId).then(response => res.send(response))
});


export default router;