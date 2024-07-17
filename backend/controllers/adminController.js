const User = require('../models/userModel');

// 获取管理员仪表盘
/*exports.getDashboard = (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard' });
};*/

// 获取管理员仪表盘并返回所有用户信息
exports.getDashboard = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        console.log('Retrieved users:', users);
        res.json(users);
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// 获取用户列表
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        console.log('Retrieved users:', users);
        res.json(users);
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// 更新用户信息
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log('Updated user:', user);
        res.json(user);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// 删除用户
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        console.log('Deleted user with id:', req.params.id);
        res.json({ message: 'User removed' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};

