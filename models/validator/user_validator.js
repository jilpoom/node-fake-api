exports.CheckUser = {
    email: {
        in: 'body',
        isEmail: {
            errorMessage: '이메일 형식이 맞지 않습니다.',
        },
        notEmpty: {
            errorMessage: '이메일을 입력하지 않았습니다..',
        }
    },
    password: {
        in: 'body',
        isLength: {
            errorMessage: '최소 8자 이상의 비밀번호가 필요합니다.',
            options: { min: 8 },
        },
        notEmpty: {
            errorMessage: '비밀번호를 입력하지 않았습니다.',
        }
    },
    name: {
        in: 'body',
        notEmpty: {
            errorMessage: '이름을 입력하지 않았습니다.',
        },
    },
    birth: {
        in: 'body',
        isDate: {
            errorMeesage: '생년월일을 입력하지 않았습니다.',
        }
    },
}