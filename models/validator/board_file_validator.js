exports.CheckBoardFile = {
    user_id: {
        in: 'body',
        errorMessage: '등록할 사용자 id를 입력해주세요',
        notEmpty: true,
    },
    board_id: {
        in: 'body',
        errorMessage: '등록할 게시글 id를 입력해주세요',
        notEmpty: true,
    },
};


