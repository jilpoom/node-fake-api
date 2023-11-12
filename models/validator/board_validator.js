exports.CheckBoard = {
    user_id: {
        in: 'body',
        notEmpty: {
            errorMessage: '사용자의 고유 아이디가 필요합니다.'
        },
    },
    title: {
        in: 'body',
        notEmpty: {
            errorMessage: '제목을 반드시 입력해야 합니다.',
        },
        isLength: {
            errorMessage: '제목은 최대 50자 이상을 넘을 수 없습니다.',
            options: { max: 50 }
        }
    },
    subtitle: {
        in: 'body',
        isLength: {
            errorMessage: '부제목은 최대 50자 이상을 넘을 수 없습니다.',
            options: { max: 50 },
        }
    },
    content: {
        in: 'body',
        notEmpty: {
            errorMessage: '내용을 반드시 입력해야 합니다.',
        }
    },
}