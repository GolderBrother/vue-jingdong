const express = require('express');
const mysql = require('mysql');
const common = require('../../libs/common');
const db = mysql.createPool({
    host: 'localhost', // db host
    user: 'root',     // db user
    password: 'root',  //db pwd
    database: 'jd'   // db name
});
module.exports = () => {
    const route = express.Router();
    const getHomeStr = `SELECT product_id,product_name,product_price,product_img_url,product_uprice FROM product`;
    const getCateNames = `SELECT * FROM category ORDER BY category_id desc`;
    //get homePage datas
    route.get('/home', (req, res) => {
        getHomeDatas(getHomeStr, res);
    });

    function getHomeDatas(getHomeStr, res) {
        db.query(getHomeStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }

    route.get('/category', (req, res) => {
        getCateNamesDatas(getCateNames, res);
    });

    function getCateNamesDatas(getCateNames, res) {
        db.query(getCateNames, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    };
    route.get('/categorygoods', (req, res) => {
        let mId = req.query.mId;
        const sql = `select * from product,category where product.category_id=category.category_id and category.category_id='${mId}'`;
        getCateGoods(sql, res);
    });

    function getCateGoods(sql, res) {
        db.query(sql, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }
    route.get('/detail', (req, res) => {
        let produId = req.query.mId;
        const imagesStr = `select image_url from product_image where product_id='${produId}'`;
        const productStr = `select * from product where product_id='${produId}'`;
        let detailDatas = [];
        db.query(imagesStr, (err, imgDatas) => {
            if (err) {
                console.error(err);
                res.status(500).send('database err').end();
            } else {
                detailDatas.push(imgDatas);
                db.query(productStr, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database err').end();
                    } else {
                        detailDatas.push(data);
                        res.send(detailDatas);
                    }
                });
            }
        });

    });
    route.get('/cart', (req, res) => {
        const cartStr = "SELECT cart_id,user.user_id,product.product_id,product_name,product_uprice,product_img_url,goods_num,product_num,shop_name FROM product,user,goods_cart,shop where product.product_id=goods_cart.product_id and user.user_id=goods_cart.user_id and shop.shop_id = product.shop_id";
        db.query(cartStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    })
    // 查找
    route.get('/search', (req, res) => {
        let keyWord = req.query.kw;
        let hot = req.query.hot;
        let priceUp = req.query.priceUp;
        let priceDown = req.query.priceDown;
        const keywordStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%'`;
        const hotStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_comment_num desc`;
        const priceUpStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice asc`;
        const priceDownStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice desc`;
        if (keyWord != '') {
            if (hot != '') {
                getSearchDatas(hotStr, res);
            } else if (priceUp != '') {
                getSearchDatas(priceUpStr, res);
            } else if (priceDown != '') {
                getSearchDatas(priceDownStr, res);
            } else {
                getSearchDatas(keywordStr, res);
            }
        }

    });
    /**
        get search datas
    */
    function getSearchDatas(keywordStr, res) {
        db.query(keywordStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }
    /*
     *user reg func
     */
    route.post('/reg', (req, res) => {

        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let regName = mObj.regName;
        let regPasswd = mObj.regPasswd;
        regPasswd = common.md5(regPasswd + common.MD5_SUFFXIE);
        const insUserInfo = `INSERT INTO user(user_name,login_password,user_number) VALUES('${regName}','${regPasswd}','${regName}')`;
        dealReg(insUserInfo, res,'服务器出错','注册成功');
    });

    route.post('/regVerify',(req,res) => {
        let mObj = {};
        for(let obj in req.body){
            mObj = JSON.parse(obj);
        };
        let regName = mObj.regName;
        const regNameVerify = `SELECT COUNT(*) as count from user where(user_name = '${regName}')`;
        db.query(regNameVerify, (err,data) => {
            if (err) {
                console.error(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                console.log(data[0].count);
                if(data[0].count>0){
                    res.send({ 'msg': '用户名已注册', 'status': 0 }).end();
                }else{
                    res.send({ 'msg': '未注册', 'status': 1 }).end();
                }

            }
        })
        // dealReg(regNameVerify, res,'未注册','已注册');
    });
    /*
     *deal user register
     */
    function dealReg(insUserInfo, res, dataMsg, errMsg) {
        db.query(insUserInfo, (err,data) => {
            if (err) {
                console.error(err);
                res.send({ 'msg': dataMsg, 'status': 0 }).end();
            } else {
                console.log(data);
                res.send({ 'msg': errMsg, 'status': 1 }).end();

            }
        })
    };
    
    /*
     *deal user change password
     */
    route.post('/changePwd', (req,res) => {
        let userObj = {};
        for(let obj in req.body){
            userObj = JSON.parse(obj);
        };
        userObj.password = common.md5(userObj.password + common.MD5_SUFFXIE);
        const selectUser = `select * from user where (user_name='${userObj.userName}' and login_password='${userObj.password}')`;
        db.query(selectUser,(err,data) => {
            console.log(data);
            if(err){
                console.log(err);
                res.send({'msg':'服务器出错','status':0}).end();
            }else {
                if(data.length == 0){
                    res.send({ 'msg':'用户名或者密码错误','status':'-1' }).end();
                }else{
                    userObj.newPassword = common.md5(userObj.newPassword + common.MD5_SUFFXIE);
                    const updatePwd = `update user set login_password="${userObj.newPassword}" where user_name="${userObj.userName}"`;
                    db.query(updatePwd,(err,data) => {
                        if(err){
                            console.log(err);
                            res.send({'msg':'更改失败，请重新输入新密码','status':'-2'}).end();
                        }else{
                            console.log(data);
                            res.send({'msg':'更改成功','status':'1'}).end();
                        }
                    })
                }
            }
        })
    })
    route.post('/login', (req, res) => {

        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
            console.log(mObj);
        }
        let username = mObj.loginName;
        //let password = common.md5(mObj.loginPawd + common.MD5_SUFFXIE);
        // console.log(username, mObj.passwd);
        const selectUser = `SELECT * FROM user where user_name='${username}'`;
        db.query(selectUser, (err, data) => {
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                if (data.length == 0) {
                    res.send({ 'msg': '该用户不存在', 'status': -1 }).end();
                } else {
                    let dataw = data[0];
                    console.log(dataw, dataw.login_password, mObj.loginPawd);
                    mObj.loginPawd = common.md5(mObj.loginPawd + common.MD5_SUFFXIE);
                    //login sucess
                    if (dataw.login_password === mObj.loginPawd) {
                        //save the session 
                        req.session['user_id'] = dataw.user_id;
                        dataw.msg = "登录成功";
                        dataw.status = 1;
                        res.send(dataw).end();
                    } else {
                        res.send({ 'msg': '密码不正确', 'status': -2 }).end();
                    }
                }
            }
        });

    });
    route.get('/userinfo', (req, res) => {
        let uId = req.query.uId;
        const getU = `SELECT user_name,user_number FROM user where user_id='${uId}'`;
        db.query(getU, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data[0]);
                }
            }
        });
    });
    return route;
}
