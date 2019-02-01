const jwt = require('jsonwebtoken');
const secretString = require('./config/keys').secretString;

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email}, secret, { expiresIn })
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {
            const allRecipes = await Recipe.find();
            
            return allRecipes;
        }
    },

    Mutation: {
        addRecipe: async (root, {  name, category,
            description, instructions, username }, { Recipe }) => {
                const newRecipe = await new Recipe({
                    name,
                    description,
                    category,
                    instructions,
                    username
                }).save();

                return newRecipe;
            },

            signupUser: async (root, { username, email, password }, { User }) => {
                const user = await User.findOne({  username });
                if (user) {
                    throw new Error('User already exist');
                }

                const newUser = await new User({
                    username,
                    email,
                    password
                }).save();

                return { token: createToken(newUser, secretString, '1hr') }
            }
    }


};