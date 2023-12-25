function skillsMember() {
    var member = {
        name: 'John',
        lastName: 'Smith',
        skills: ['js', 'css', 'html'],
        showSkills: function () {
            this.skills.forEach(function (skill) {
                // console.log(this.name + ' knows ' + skill);
                console.log(this.name + ' knows ' + skill);
            });
        }
    };
    member.showSkills();

}