require('../css/a.css');
class Person {
    constructor() {
        this.name = 'hello';
    }
    getName() {
        return this.name;
    }
}
module.exports = Person;