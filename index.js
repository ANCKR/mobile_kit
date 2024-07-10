const time = 60;
const paths = 6;

const func = () => {
    const waitingTime = (time * paths) - time;
    const oneDaySecs = 3600 * 24;
    const totalPath = oneDaySecs / waitingTime;
    console.log("Total: ", totalPath)
    console.log("Waiting time: ", waitingTime)
}

const patternData = {
    1: [4,2,5,7,8,9],
    2: [1,2,3,4,5,6,7,8,9],
    3: [1,2,3,4,5,6,7,8,9],
    4: [1,4,5,3,6,9],
    5: [1,2,3,4,5,6,7,8,9],
    6: [1,2,3,4,5,6,7,8,9],
    7: [1,2,3,4,5,6,9],
    8: [1,2,3,4,5,6,7,8,9],
    9: [1,2,3,4,5,6,7,8,9],
    0: [1,2,3,4,6,7,8,9]
}

const patFunc = (pointer, startNum, endNum) => {
    let count = 0;
    for (let index = startNum; index <= endNum; index++) {
        let firstDigit = parseInt(index / 10);
        let lastDigit  = index % 10;
        const element = index >= 10 ? lastDigit : index;
        // console.log(`Element: ${element}`, patternData[element])
        if (patternData[element].includes(pointer)) {
            count++;
        }
    }
    console.log("Result: ", count)
}

const classFunc = () => {
    const subject = 8
    const classes = 5
    const section = 1
    const maxSubTeach = 3

    // const totalSubjectsTeached = classes * subject * section
    // const teacherReqForDiffSub = Math.ceil(subject / maxSubTeach);

    // const oneTeacherCanTeach = Math.ceil(subject / maxSubTeach);

    // const minTeach = totalSubjectsTeached / oneTeacherCanTeach

    // const minTeacherRequired = totalSubjectsTeached / maxSubTeach
    // const a = maxSubTeach * teacherReqForDiffSub
    // console.log({minTeacherRequired, teacherReqForDiffSub, a, minTeach})
    // console.log("Min teacher required: ", Math.ceil(minTeacherRequired))

    const halfSub = Math.ceil(subject / maxSubTeach);
    const teacherForClass = classes * halfSub;
    console.log({teacherForClass})
}

// func()
// patFunc(2, 19, 25)
classFunc()