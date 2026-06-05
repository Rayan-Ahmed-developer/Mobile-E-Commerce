const orderModel = require("../Models/orderModel");
const authModel = require("../Models/authModel");

const dashboardStats = async (req, res) => {
  try {
    // 1. Basic Counts
    const totalOrders = await orderModel.countDocuments();
    const totalUsers = await authModel.countDocuments();
    const pendingOrders = await orderModel.countDocuments({ status: "pending" });

    // 2. Revenue Calculation (only for delivered orders)
    const revenue = await orderModel.aggregate([
      { $match: { status: "delivered" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    // 3. Response with success flag for frontend
    res.send({
      success: true, 
      stats: {
        totalRevenue: revenue[0]?.totalRevenue || 0,
        totalOrders,
        totalUsers,
        pendingOrders
      }
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

module.exports = dashboardStats;