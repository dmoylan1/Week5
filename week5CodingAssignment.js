class Assignment {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }

    describe() {
        return `This student earned a ${this.score} on ${this.name} assignment.`;
    }
}

class Student {
    constructor(name) {
    this.name = name;
    this.assignments = [];
}

addAssignment(assignment) {
    if (assignment instanceof Assignment) {
        this.assignments.push(assignment);
    } else {
        throw new Error(`You an only add an instance of Assignment. Argument is not an assignment: ${assignment}`)
    }
}

describe() {
    return `${this.name} has completed ${this.assignments.length} assignments this semester.`
    }
}

class Menu {
    constructor() {
        this.students = [];
        this.selectedStudent = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.addStudent();
                    break;
                case '2':
                    this.viewStudent();
                    break;
                case '3':
                    this.deleteStudent();
                    break;
                case '4':
                    this.showAllStudents();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Add Student
        2) View Student
        3) Delete Student
        4) Show All Students
        `);
    }

    showStudentMenuOptions(studentInfo) {
        return prompt(`
        0) Back
        1) Create Assignment
        2) Delete Assignment
        ----------------------
        ${studentInfo}
        `);
    }

    showAllStudents() {
        let studentString = '';
        for (let i = 0; i < this.students.length; i++) {
            studentString += i + ') ' + this.students[i].name + '\n';
        }
        alert(studentString);
    }
    
    addStudent () {
        let name = prompt('Enter name of new student:');
        this.students.push(new Student(name));
    }

    viewStudent () {
        let index = prompt('Enter the index of student to view:');
        if (index > -1 && index < this.students.length) {
            this.selectedStudent = this.students[index];
        let description = 'Student Name: ' + this.selectedStudent.name + '\n';
        
        for (let i = 0; i < this.selectedStudent.assignments.length; i++) {
            description += i + ') ' + this.selectedStudent.assignments[i].name 
            + ' - ' + this.selectedStudent.assignments[i].score + '\n';
        }

        let selection = this.showStudentMenuOptions(description);
        switch(selection) {
            case '1':
                this.createAssignment();
                break;
            case '2':
                this.deleteAssignment();
             }
        }
    }

    deleteStudent() {
        let index = prompt('Enter the prompt of the student to delete:');
        if (index > -1 && index < this.students.length) {
            this.students.splice(index, 1);
        }
    }

    createAssignment() {
        let name = prompt('Enter name of new assignment:');
        let score = prompt(`Enter student's score on assignment:`)
        this.selectedStudent.assignments.push(new Assignment(name, score));
    }

    deleteAssignment() {
        let index = prompt('Enter the index of the assignment to delete:');
        if (index > -1 && index < this.selectedStudent.assignments.length) {
            this.selectedStudent.assignments.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();