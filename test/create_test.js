const assert = require('assert'),
    User = require("../src/user");

describe('Creating records',()=>{
    it('saves a user',(done)=>{
       const joe = new User({name:'Joe'}); 
        joe.save()
        .then(()=>{
            console.log(JSON.stringify.joe);
            assert(!joe.isNew);
            done();
        })
    });
});