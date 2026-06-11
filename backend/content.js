export const siteContent = {
  navigation: [
    { id: "home", label: "Trang chủ", href: "/" },
    { id: "blog", label: "Tin tức", href: "/blog" },
    { id: "matches", label: "Lịch đấu", href: "/matches" },
    { id: "players", label: "Thành viên", href: "/players" },
    { id: "kits", label: "Shop", href: "/kits" },
    { id: "honors", label: "Danh hiệu", href: "/honors" },
    { id: "community", label: "Fan zone", href: "/community" },
    { id: "partners", label: "Đối tác", href: "/partners" },
    { id: "stats", label: "Thống kê", href: "/stats" },
    { id: "admin", label: "Admin", href: "/admin" }
  ],

  pageHeroes: {
    blog: {
      eyebrow: "FC LH Stories",
      title: "Tin tức mới nhất",
      description: "Cập nhật matchday, chuyển nhượng, hậu trường và các câu chuyện của đội bóng."
    },
    matches: {
      eyebrow: "Match center",
      title: "Lịch thi đấu và kết quả",
      description: "Theo dõi trận gần nhất, trận sắp tới, tỷ số, sân đấu và người ghi bàn."
    },
    honors: {
      eyebrow: "Trophy room",
      title: "Danh hiệu đạt được",
      description: "Những cột mốc vô địch, giải thưởng và kỷ lục đáng nhớ trong hành trình FC LH."
    },
    players: {
      eyebrow: "First team",
      title: "Đội hình chính thức",
      description: "Hồ sơ cầu thủ với số áo, vị trí, vai trò và thống kê nổi bật."
    },
    stats: {
      eyebrow: "Match data",
      title: "Thống kê đội bóng",
      description: "Bảng theo dõi bàn thắng, kiến tạo, hiệu suất tấn công và dữ liệu trận đấu."
    },
    community: {
      eyebrow: "Fan zone",
      title: "Cộng đồng FC LH",
      description: "Nơi người hâm mộ theo dõi hoạt động, bình chọn và kết nối với đội bóng."
    },
    partners: {
      eyebrow: "Partners",
      title: "Đối tác đồng hành",
      description: "Các đơn vị hỗ trợ trang phục, truyền thông và hoạt động thi đấu của FC LH."
    },
    admin: {
      eyebrow: "Club operations",
      title: "Bảng quản trị nội dung",
      description: "Khu vực kiểm tra dữ liệu nhanh và cập nhật kết quả trận đấu cho website."
    }
  },

  home: {
    primaryAction: "Xem đội hình",
    secondaryAction: "Match center",
    matchLabels: {
      latest: "Trận mới nhất",
      mvp: "Cầu thủ hay nhất",
      next: "Trận tiếp theo"
    },
    hubEyebrow: "Official club hub",
    hubTitle: "Một website CLB đúng nghĩa: tin tức, lịch đấu, đội hình, shop và fan zone",
    featureCards: {
      blog: "Tin tức và hậu trường",
      matches: "Lịch đấu và kết quả",
      players: "Đội hình First Team",
      kits: "Shop áo đấu",
      community: "Fan zone",
      partners: "Đối tác"
    },
    styleEyebrow: "Phong cách thi đấu",
    styleTitle: "Kiểm soát bóng, pressing cao, chuyển trạng thái nhanh",
    styleText: "FC LH ưu tiên nhịp chuyền chắc, đoạt bóng sớm và khai thác tốc độ ở hai biên.",
    statLabels: {
      possession: "Kiểm soát bóng TB",
      goals: "Bàn từ dữ liệu",
      unbeaten: "Trận bất bại",
      honors: "Danh hiệu"
    }
  },

  history: {
    introTitle: "Hành trình khởi đầu",
    achievementTitle: "Thành tích nổi bật"
  },

  kits: {
    title: "FC LH Store",
    note: "Bộ sưu tập áo đấu, áo training và các mẫu retro của đội bóng.",
    tabs: ["Home", "Away", "Training", "Retro"]
  },

  stats: {
    chartTitle: "Bàn thắng các trận gần nhất",
    formTitle: "Thêm kết quả trận",
    opponent: "Đối thủ",
    homeGoals: "Bàn FC LH",
    awayGoals: "Bàn đối thủ",
    shots: "Sút trúng đích",
    scorers: "Người ghi bàn",
    submit: "Save",
    saving: "Đang lưu...",
    table: {
      match: "Trận",
      scorers: "Người ghi bàn",
      shots: "Sút trúng đích"
    }
  },

  runtime: {
    loading: "Đang tải dữ liệu CLB...",
    saveError: "Không lưu được trận đấu.",
    saveSuccess: "Đã lưu trận mới vào database.",
    footer: "Offical LH Footbal Club"
  }
};
