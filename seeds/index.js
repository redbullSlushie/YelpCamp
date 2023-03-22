const mongoose = require('mongoose');
const campground = require('../models/campground');
mongoose.set('strictQuery', false);
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, desriptors, descriptors } = require('./seedHelpers');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('Connected to Database')
};

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63e5bb327a0a30287c814587',
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae delectus quia tempora ullam voluptatibus fugit est ad harum! Minus ipsum aliquid, dolores dicta laudantium sit? Debitis provident ab quis exercitationem.',
            price,
            geometry: { type: 'Point', coordinates: [
                 cities[random1000].longitude,
                 cities[random1000].latitude,
            ]},
            images: [
                {
                    url: 'https://res.cloudinary.com/dnn7vo4hp/image/upload/v1676780147/YelpCamp/ffynxne1cxinseziallk.jpg',
                    filename: 'YelpCamp/ffynxne1cxinseziallk'
                },
                {
                    url: 'https://res.cloudinary.com/dnn7vo4hp/image/upload/v1676780148/YelpCamp/iplafcfeo7nlzcogrsi2.jpg',
                    filename: 'YelpCamp/iplafcfeo7nlzcogrsi2'
                }
            ]

        })

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})