const authDAO = require('../dao/auth');

exports.login = async (req, res) => {
    console.log(req.body);
    const { 'student-id': memberId, password } = req.body;

    if (!memberId || !password) {
        return res.status(400).json({ message: 'Student ID and Password are required.' });
    }

    try {
        const user = await authDAO.findMemberById(memberId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password.' });
        }
        // Success: return the user's name
        res.json({ message: 'Login successful.', name: user.name });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
