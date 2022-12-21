const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//schema de la ville
const villeSchema = new Schema({
    nom: {type: String, required: [true, 'Le nom est requis!']},
    population: {type: Number, required : [true, 'La population est requise!']},
    codePostal: [{ type: String, default : null, validate: { 
        validator: function(v) { 
            return /^[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}/.test(v); 
        },
        message: props => `${props.value} n'est pas un code postal valide!`
        },
        required : [true, 'Le code postal est requis!']
    }],
    superficie: {type: Number, required : [true, 'La superficie est requise!']},
    longitude: {type: Number, required : [true, 'La longitude est requise!']},
    latitude: {type: Number, required : [true, 'La latitude est requise!']},
    altitude: {type: Number, required : [true, 'L\'altitude est requise!']},
    region: {type: String, required : [true, 'La région est requise!']},
    densite: {type: Number, required : [true, 'La densité est requise!']},
    dateCreation: {type: Number, required : [true, 'La date de création est requise!'], validate: {
            validator: function(v) {
                return v >= 1500 && v <= 2022;
            },
            message: props => `${props.value} n'est pas une date valide!`
        }
    },
    fondateur: {type: String, required : [true, 'Le fondateur est requis!']},
    SiteTouristique: { type: [{
        nom: {type: String, required: [true, 'Le nom du site touristique est requis!']},
        description: String,
        addresse: {type: String, required: [true, 'L\'adresse du site touristique est requise!']},
        _id: false
    }] },
    conservateurAuPouvoir: {type: Boolean, default: false},
    //create token thats will be the 3 first letters of the city name + 2 first numbers of the population and hash it
    token: {type: String, required: [true, 'Le token est requis!']},    
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

villeSchema.virtual('fondation').get(function () {
    return "Fondée en " + this.dateCreation + " par " + this.fondateur;
});

villeSchema.virtual('fondationEN').get(function () {
    return "Founded in " + this.dateCreation + " by " + this.fondateur;
});
villeSchema.virtual("position").get(function () {
    return this.latitude + ', ' + this.longitude;
});

module.exports = mongoose.model('Ville', villeSchema, 'ville');