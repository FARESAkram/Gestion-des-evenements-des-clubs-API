const Visitor = require("../models/Visitor");
const Sequelize = require("sequelize");
const moment = require("moment");

const addVisitor =  async (req,res,next)=> {
    // add visitor
    try
    {
        let today = new Date()
        let countToday = await Visitor.findOne({
            where:Sequelize.where(Sequelize.fn('date', Sequelize.col('jour')), '=', moment(today).format('YYYY-MM-DD'))
        })
        if ( countToday === null)
        {
            await Visitor.create({'number':1,'jour':today});
        }
        else
        {
            countToday.number ++ ;
            await countToday.save();
        }
    }
    catch (e)
    {
        console.log(e.message)
    }
    // Pass to next layer of middleware
    next();
};

module.exports = addVisitor