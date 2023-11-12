exports.CheckComment = {
    user_id: {
        in: 'body',
        notEmpty: {
            errorMessage: '등록할 사용자 id를 입력해주세요',
        }
    },
    board_id: {
        in: 'body',
        notEmpty: {
            errorMessage: '등록할 게시글 id를 입력해주세요',
        }
    },
    content: {
        in: 'body',
        notEmpty: {
            errorMessage: '내용을 입력해주세요',
        }
    },
}