import express from 'express';
import router from express();
import path from 'path';

router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
});


module.exports = router;
