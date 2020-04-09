const assert = require("assert"),
    User = require("../src/user");

describe("Validating Records",()=>{
    it("requires a user name",()=>{
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;
        assert(message==="Name is required");
        
    });

    it("Name of user must be greater than 2 characters",()=>{
        const user = new User({name:"Al"});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;
        assert(message === "Name must be longer than 2 characters");
    });

    it("disallow invalid record to be added to database",(done)=>{
        const user = new User({name:"Al"});
        user.save()
        .catch(validationResult=>{
            const {message} = validationResult.errors.name;
            assert(message === "Name must be longer than 2 characters");
            done();
        });
    });

});