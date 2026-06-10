export const siteContent = {
  navigation: [
    { id: "home", label: "Trang chủ", href: "/" },
    { id: "blog", label: "Blog", href: "/blog" },
    { id: "history", label: "Lịch sử", href: "/history" },
    { id: "honors", label: "Danh hiệu", href: "/honors" },
    { id: "players", label: "Cầu thủ", href: "/players" },
    { id: "kits", label: "Trang phục", href: "/kits" },
    { id: "stats", label: "Thống kê", href: "/stats" },
  ],

  pageHeroes: {
    honors: {
      eyebrow: "Trophy room",
      title: "Danh hiệu đạt được",
      description: "Những cột mốc vô địch và giải thưởng cá nhân nổi bật trong hành trình phát triển của CLB.",
    },
    players: {
      eyebrow: "First team",
      title: "Danh sách cầu thủ",
      description: "Đội hình chính thức của đội bóng với số áo, vị trí và ảnh đại diện.",
    },
    stats: {
      eyebrow: "Match data",
      title: "Thống kê bàn thắng các trận",
      description: "Bảng theo dõi kết quả, cầu thủ ghi bàn và hiệu suất tấn công trong các trận gần đây.",
    },
  },

  home: {
    primaryAction: "Đội hình",
    secondaryAction: "Khám phá CLB",
    matchLabels: {
      latest: "Trận mới nhất",
      mvp: "Cầu thủ hay nhất",
      next: "Trận tiếp theo",
    },
    hubEyebrow: "Club hub",
    hubTitle: "Đi vào từng lát cắt của đội bóng",
    featureCards: {
      history: "Lịch sử hình thành",
      honors: "Danh hiệu đạt được",
      kits: "Trang phục qua mùa",
    },
    styleEyebrow: "Phong cách thi đấu",
    styleTitle: "Kiểm soát bóng, pressing cao, chuyển trạng thái nhanh",
    statLabels: {
      possession: "Kiểm soát bóng TB",
      goals: "Bàn từ dữ liệu",
      unbeaten: "Trận bất bại",
      honors: "Danh hiệu",
    },
  },

  blog: {
    title: "Blog của CLB",
    description: "Cập nhật những tin tức mới nhất về đội bóng.",
  },

  history: {
    introTitle: "Hành Trình Khởi Đầu",
    introText:
      "LH FC được thành lập vào năm 2018, tiền thân là tập hợp những nam sinh đầy nhiệt huyết của tập thể lớp 12C trường Trung học phổ thông Kim Thành. Khởi đầu từ những trận bóng phong trào học đường, tình yêu mãnh liệt với trái bóng tròn cùng sự gắn kết bè bạn bền chặt đã trở thành nền móng vững chắc, đưa đội bóng vượt qua giai đoạn học sinh để trở thành một tập thể phủi kiên cường, duy trì sinh hoạt bền bỉ suốt nhiều năm qua.",
    achievementTitle: "Thành tích nổi bật",
    achievements: [
      {
        title: "2019-2020: Chung kết giải vô địch trường Trung học phổ thông Kim Thành",
        accent: "blue",
        text:
          "Hành trình năm ấy đã viết nên một chương kinh điển khi đánh bại lớp 11E tại trận bán kết bằng tinh thần quả cảm kiên cường. Dù phải dừng bước trước các đàn anh đầy đáng tiếc trong trận chung kết cuối cùng, ngôi vị Á quân vẫn là bệ phóng lịch sử khẳng định vị thế của đội.",
      },
      {
        title: "2020-2021: Kỷ lục Vàng - Bản hùng ca bất bại",
        accent: "red",
        text:
          "Mốc son chói lọi và tự hào nhất trong hành trình phát triển của LH FC chính là kỳ tích bất bại suốt trọn vẹn năm 2021. Bằng đấu pháp kỷ luật thép kết hợp với sự thăng hoa rực rỡ của các nhân tố trên hàng công, đội bóng đã duy trì một mạch trận thần thánh, hoàn toàn không nếm mùi thất bại trước bất kỳ đối thủ nào trong khu vực.",
      },
    ],
  },

  kits: {
    title: "Bộ Sưu Tập Áo Đấu",
    note: "Mẫu áo của đội bóng qua các thời kỳ.",
  },

  stats: {
    chartTitle: "Bàn thắng các trận gần nhất",
    formTitle: "Thêm kết quả trận",
    opponent: "Đối thủ",
    homeGoals: "Bàn FC LH",
    awayGoals: "Bàn đối thủ",
    shots: "Cú sút trúng đích",
    scorers: "Người ghi bàn",
    submit: "Lưu vào databas",
    saving: "Đang lưu...",
    table: {
      match: "Trận",
      scorers: "Người ghi bàn",
      shots: "Sút trúng đích",
    },
  },

  runtime: {
    loading: "Đang tải dữ liệu CLB từ database...",
    saveError: "Không lưu được trận đấu.",
    saveSuccess: "Đã lưu trận mới vào database.",
    footer: "",
  },
};
