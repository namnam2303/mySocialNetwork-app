export const mockPosts = [
  {
    id: 1,
    user: {
      name: "Nguyễn Văn A",
      avatar: "/api/placeholder/40/40",
    },
    content: "Hôm nay trời đẹp quá! 🌞",
    likes: 15,
    comments: [
      {
        user: {
          name: "Trần Thị B",
          avatar: "/api/placeholder/40/40",
        },
        content: "Đúng vậy, rất thích hợp để đi dạo.",
      },
    ],
    timestamp: "2024-08-10T08:00:00Z",
  },
  {
    id: 2,
    user: {
      name: "Lê Văn C",
      avatar: "/api/placeholder/40/40",
    },
    content:
      "Mình vừa đọc xong một cuốn sách hay, các bạn có gợi ý gì cho cuốn tiếp theo không?",
    likes: 8,
    comments: [
      {
        user: {
          name: "Phạm Thị D",
          avatar: "/api/placeholder/40/40",
        },
        content: "Bạn thử đọc 'Đắc Nhân Tâm' xem, rất hay đó!",
      },
    ],
    timestamp: "2024-08-10T10:30:00Z",
  },
  {
    id: 3,
    user: {
      name: "Hoàng Văn E",
      avatar: "/api/placeholder/40/40",
    },
    content: "Vừa về từ chuyến du lịch Đà Lạt, thật tuyệt vời! 🏞️",
    likes: 25,
    comments: [
      {
        user: {
          name: "Nguyễn Thị F",
          avatar: "/api/placeholder/40/40",
        },
        content: "Đà Lạt đẹp lắm, lần sau mình cũng muốn đi!",
      },
      {
        user: {
          name: "Trần Văn G",
          avatar: "/api/placeholder/40/40",
        },
        content: "Bạn có ghé thăm những địa điểm nào?",
      },
    ],
    timestamp: "2024-08-10T15:45:00Z",
  },
];
