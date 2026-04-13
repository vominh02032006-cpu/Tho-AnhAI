// ===== DỮ LIỆU THƠ AI — dùng chung cho tất cả trang =====
const POEMS_DATA = [
  // ── THIÊN NHIÊN ──
  {
    id: 1, category: "nature", tag: "Thiên Nhiên",
    title: "Sương Mai Trên Đồng",
    seed: "misty-field-dawn",
    imgW: 600, imgH: 420,
    poem: `Sương mai phủ nhẹ trên đồng xanh,
Giọt nước long lanh như mắt anh.
Chim hót vang lời chào buổi sáng,
Lòng tôi bỗng nhẹ, bỗng thanh thanh.

Cỏ non còn ướt hơi đêm lạnh,
Hoa dại ven đường khẽ ngẩng đầu.
Mặt trời lên chậm sau rặng núi,
Tô hồng cả một góc trời sâu.`,
    likes: 1842, comments: 94, views: 5230,
    style: "Tứ Tuyệt", mood: "Bình Yên"
  },
  {
    id: 2, category: "nature", tag: "Thiên Nhiên",
    title: "Lá Thu Vàng",
    seed: "autumn-leaves-golden",
    imgW: 600, imgH: 420,
    poem: `Lá vàng rơi nhẹ trước hiên nhà,
Mùa thu về mang theo nỗi xa.
Gió thổi qua mang hương cỏ dại,
Lòng tôi bỗng nhớ những ngày qua.

Từng chiếc lá như trang nhật ký,
Ghi lại bao kỷ niệm đã phai.
Mùa thu ơi, sao buồn đến vậy,
Hay tại lòng ta chẳng chịu thôi?`,
    likes: 2103, comments: 118, views: 6780,
    style: "Tứ Tuyệt", mood: "Hoài Niệm"
  },
  {
    id: 3, category: "nature", tag: "Thiên Nhiên",
    title: "Bình Minh Trên Núi",
    seed: "mountain-sunrise-fog",
    imgW: 600, imgH: 420,
    poem: `Ánh sáng đầu tiên chạm đỉnh núi xa,
Sương tan dần như giấc mộng qua.
Chim hót vang lời chào buổi sáng,
Đất trời như mới, lòng người thêm hoa.

Tôi đứng đây giữa mây và gió,
Cảm nhận từng hơi thở của rừng.
Núi cao dạy ta điều bình thản,
Mọi lo âu nhỏ bé, không cùng.`,
    likes: 2341, comments: 128, views: 7120,
    style: "Tứ Tuyệt", mood: "Hùng Tráng"
  },
  {
    id: 4, category: "nature", tag: "Thiên Nhiên",
    title: "Mưa Rừng",
    seed: "rain-forest-green",
    imgW: 600, imgH: 420,
    poem: `Mưa rừng rơi xuống lá xanh tươi,
Tiếng nước chảy như khúc nhạc trời.
Đất ẩm thơm mùi hương cỏ dại,
Rừng già thức giấc, đón mưa rơi.

Từng giọt mưa như lời thì thầm,
Kể chuyện ngàn năm của đất trời.
Tôi ngồi lặng nghe trong tĩnh lặng,
Lòng bỗng trong veo, nhẹ tựa mây trôi.`,
    likes: 1567, comments: 82, views: 4890,
    style: "Tứ Tuyệt", mood: "Tĩnh Lặng"
  },
  {
    id: 5, category: "nature", tag: "Thiên Nhiên",
    title: "Hoàng Hôn Biển",
    seed: "sunset-ocean-waves",
    imgW: 600, imgH: 420,
    poem: `Mặt trời chìm xuống biển xa khơi,
Nhuộm đỏ cả một góc chân trời.
Sóng vỗ bờ như tiếng thở dài,
Của biển cả nhớ thương ai rồi.

Tôi ngồi đây nhìn hoàng hôn tắt,
Nghĩ về những điều đã qua đi.
Biển dạy ta rằng: sau mỗi tối,
Bình minh lại đến, chớ lo chi.`,
    likes: 1923, comments: 105, views: 5670,
    style: "Tứ Tuyệt", mood: "Suy Tư"
  },

  // ── TÌNH YÊU ──
  {
    id: 6, category: "love", tag: "Tình Yêu",
    title: "Nhớ Em",
    seed: "couple-rain-street",
    imgW: 600, imgH: 420,
    poem: `Mưa rơi trên phố vắng chiều nay,
Nhớ em như nhớ một vầng mây.
Trôi qua rồi mất không tìm lại,
Chỉ còn hương cũ vấn vương đây.

Những con đường ta từng dạo bước,
Giờ tôi đi một mình lặng thinh.
Bóng em in trên từng viên đá,
Mưa rơi xóa nhòa, lòng vẫn xinh.`,
    likes: 3102, comments: 187, views: 9450,
    style: "Tứ Tuyệt", mood: "Nhớ Nhung"
  },
  {
    id: 7, category: "love", tag: "Tình Yêu",
    title: "Hẹn Ước Dưới Cây",
    seed: "old-tree-couple-promise",
    imgW: 600, imgH: 420,
    poem: `Dưới gốc cây già ta hẹn nhau,
Một lời thề nhẹ, một cái đầu.
Năm tháng trôi qua, cây vẫn đó,
Chỉ người xưa đã đi về đâu.

Cây già vẫn nhớ lời ta nói,
Khắc sâu vào thân những chữ yêu.
Tôi về đây đứng nhìn cây cũ,
Nước mắt rơi theo chiều gió chiều.`,
    likes: 2456, comments: 156, views: 7830,
    style: "Tứ Tuyệt", mood: "Buồn"
  },
  {
    id: 8, category: "love", tag: "Tình Yêu",
    title: "Mưa Và Em",
    seed: "rain-window-love",
    imgW: 600, imgH: 420,
    poem: `Em đến như mưa không báo trước,
Làm ướt cả trái tim khô cằn.
Tôi đứng giữa cơn mưa của em,
Không muốn trú, chỉ muốn được gần.

Mưa tạnh rồi em cũng đi xa,
Để lại mùi đất ẩm thơm tho.
Tôi nhặt từng giọt mưa còn đọng,
Cất vào tim, giữ mãi không cho.`,
    likes: 2789, comments: 203, views: 8920,
    style: "Thơ Hiện Đại", mood: "Lãng Mạn"
  },
  {
    id: 9, category: "love", tag: "Tình Yêu",
    title: "Khoảng Cách",
    seed: "distance-longing-window",
    imgW: 600, imgH: 420,
    poem: `Ngàn dặm xa nhau, lòng vẫn gần,
Mỗi đêm nhìn sao, nhớ bóng hình.
Em ở phương trời nào đó đó,
Có nhìn trăng này, có nhớ anh?

Điện thoại sáng lên rồi lại tắt,
Tin nhắn chưa gửi, lòng bâng khuâng.
Yêu nhau mà sao xa đến vậy,
Khoảng cách nào đo được nhớ thương?`,
    likes: 2134, comments: 134, views: 6540,
    style: "Tứ Tuyệt", mood: "Nhớ Nhung"
  },
  {
    id: 10, category: "love", tag: "Tình Yêu",
    title: "Nụ Cười Em",
    seed: "smile-sunshine-portrait",
    imgW: 600, imgH: 420,
    poem: `Nụ cười em như nắng ban mai,
Xua tan đi mọi bóng tối dài.
Tôi sống vì nụ cười ấy đó,
Dù cuộc đời có lắm đắng cay.

Mỗi sáng thức dậy nhìn sang em,
Thấy cả bầu trời trong mắt trong.
Yêu em không cần lời hoa mỹ,
Chỉ cần em cười, đủ ấm lòng.`,
    likes: 1876, comments: 98, views: 5340,
    style: "Tứ Tuyệt", mood: "Hạnh Phúc"
  },

  // ── CUỘC SỐNG ──
  {
    id: 11, category: "life", tag: "Cuộc Sống",
    title: "Phố Đêm",
    seed: "night-city-lights-street",
    imgW: 600, imgH: 420,
    poem: `Đèn đường vàng rọi xuống lối đi,
Bước chân ai đó vội vàng về.
Phố đêm ôm trọn bao câu chuyện,
Của những người không ai biết tên.

Quán cà phê cuối phố còn sáng,
Vài người ngồi lặng, nhìn mưa rơi.
Mỗi người mang một nỗi riêng tư,
Phố đêm — nơi ta được là mình thôi.`,
    likes: 1654, comments: 87, views: 4980,
    style: "Thơ Hiện Đại", mood: "Suy Tư"
  },
  {
    id: 12, category: "life", tag: "Cuộc Sống",
    title: "Buổi Sáng Bình Yên",
    seed: "morning-coffee-peaceful",
    imgW: 600, imgH: 420,
    poem: `Cà phê thơm, tờ báo buổi sáng,
Nắng len qua kẽ cửa vào nhà.
Một ngày mới bắt đầu lặng lẽ,
Bình yên thôi, chẳng cần gì xa.

Tiếng chim hót ngoài vườn nhỏ,
Gió sớm mang hương hoa vào phòng.
Tôi ngồi đây, uống từng ngụm nhỏ,
Cảm ơn đời cho buổi sáng trong.`,
    likes: 1234, comments: 65, views: 3870,
    style: "Tứ Tuyệt", mood: "Bình Yên"
  },
  {
    id: 13, category: "life", tag: "Cuộc Sống",
    title: "Mẹ",
    seed: "mother-hands-warm-light",
    imgW: 600, imgH: 420,
    poem: `Đôi tay mẹ gầy theo năm tháng,
Nhăn nheo nhưng ấm áp vô cùng.
Bao nhiêu năm mẹ lo cho con,
Quên đi bản thân, chỉ biết yêu thương.

Mỗi nếp nhăn là một câu chuyện,
Về những đêm thức trắng vì con.
Mẹ ơi, con chưa kịp nói cảm ơn,
Mà tóc mẹ đã bạc trắng rồi.`,
    likes: 4521, comments: 312, views: 14200,
    style: "Thơ Hiện Đại", mood: "Xúc Động"
  },
  {
    id: 14, category: "life", tag: "Cuộc Sống",
    title: "Tuổi Thơ",
    seed: "childhood-field-kite",
    imgW: 600, imgH: 420,
    poem: `Ngày xưa ta thả diều trên đồng,
Tiếng cười vang vọng cả cánh đồng.
Bây giờ lớn rồi, diều đã đứt,
Chỉ còn ký ức bay trong lòng.

Tuổi thơ ơi, sao ngắn ngủi vậy,
Như giấc mơ đẹp vừa tỉnh ra.
Tôi muốn quay về ngày hôm đó,
Chạy trên cỏ xanh, không lo xa.`,
    likes: 2876, comments: 178, views: 8650,
    style: "Tứ Tuyệt", mood: "Hoài Niệm"
  },
  {
    id: 15, category: "life", tag: "Cuộc Sống",
    title: "Vội Vàng",
    seed: "busy-city-rush-hour",
    imgW: 600, imgH: 420,
    poem: `Người người vội vã trên phố đông,
Ai cũng chạy đua với thời gian.
Dừng lại một giây nhìn bầu trời,
Xanh lắm — mà ta chẳng thấy bao giờ.

Cuộc sống không phải cuộc đua,
Nhưng ta cứ chạy, chẳng biết về đâu.
Hãy dừng lại, thở, và nhìn xung quanh,
Hạnh phúc đang ở ngay bên cạnh thôi.`,
    likes: 1987, comments: 123, views: 6120,
    style: "Thơ Hiện Đại", mood: "Suy Tư"
  },

  // ── GIẤC MƠ ──
  {
    id: 16, category: "dream", tag: "Giấc Mơ",
    title: "Giấc Mơ Xanh",
    seed: "dreamy-forest-light",
    imgW: 600, imgH: 420,
    poem: `Tôi mơ thấy một khu rừng xanh,
Nơi thời gian đứng lại, lặng thinh.
Cánh bướm vàng bay qua kẽ lá,
Và em ngồi đó, mỉm cười xinh.

Trong giấc mơ không có chia ly,
Không có nước mắt, chỉ có yêu.
Tôi muốn ngủ mãi trong giấc đó,
Đừng đánh thức tôi, dù trời chiều.`,
    likes: 1789, comments: 96, views: 5430,
    style: "Tứ Tuyệt", mood: "Mơ Mộng"
  },
  {
    id: 17, category: "dream", tag: "Giấc Mơ",
    title: "Biển Trong Mơ",
    seed: "dreamy-ocean-blue",
    imgW: 600, imgH: 420,
    poem: `Tôi mơ thấy biển xanh vô tận,
Sóng vỗ bờ như tiếng thở dài.
Em đứng đó tóc bay trong gió,
Mỉm cười rồi tan vào mây trời.

Tôi chạy về phía em mà mãi,
Không bao giờ chạm được bàn tay.
Biển trong mơ đẹp hơn thực tại,
Vì có em — điều tôi mất rồi.`,
    likes: 2134, comments: 142, views: 6780,
    style: "Tứ Tuyệt", mood: "Buồn"
  },
  {
    id: 18, category: "dream", tag: "Giấc Mơ",
    title: "Cánh Cửa Xanh",
    seed: "blue-door-mystery",
    imgW: 600, imgH: 420,
    poem: `Trong giấc mơ có một cánh cửa,
Màu xanh như trời, như biển sâu.
Tôi đứng trước cửa, tay run rẩy,
Không biết phía sau là gì đâu.

Mở cửa ra — ánh sáng tràn vào,
Một thế giới khác, đẹp không ngờ.
Nơi đó không có đau, không khổ,
Chỉ có bình yên và những giấc mơ.`,
    likes: 1654, comments: 88, views: 4920,
    style: "Tứ Tuyệt", mood: "Huyền Bí"
  },
  {
    id: 19, category: "dream", tag: "Giấc Mơ",
    title: "Bay Lên",
    seed: "flying-clouds-freedom",
    imgW: 600, imgH: 420,
    poem: `Đêm qua tôi mơ mình được bay,
Vượt qua mây trắng, vượt trời mây.
Nhìn xuống thấy đời nhỏ bé quá,
Những lo âu tan biến từng ngày.

Trên cao kia gió mát lạnh lùng,
Tự do như chưa bao giờ được.
Tỉnh dậy rồi, tay vẫn còn vươn,
Muốn nắm lấy giấc mơ đêm trước.`,
    likes: 1432, comments: 74, views: 4230,
    style: "Tứ Tuyệt", mood: "Tự Do"
  },
  {
    id: 20, category: "dream", tag: "Giấc Mơ",
    title: "Thành Phố Trong Mây",
    seed: "cloud-city-fantasy",
    imgW: 600, imgH: 420,
    poem: `Có một thành phố trên mây trắng,
Nơi người ta sống bằng ước mơ.
Đường phố lát bằng ánh sao đêm,
Nhà cửa xây từ những vần thơ.

Tôi muốn đến đó một lần thôi,
Để thấy mình còn biết ước mơ.
Cuộc đời thực đôi khi quá nặng,
Cần một nơi để hồn được thơ.`,
    likes: 1876, comments: 112, views: 5670,
    style: "Tứ Tuyệt", mood: "Mơ Mộng"
  },
];

// Lấy bài thơ theo id
function getPoemById(id) {
  return POEMS_DATA.find(p => p.id === parseInt(id));
}

// Lấy bài thơ liên quan (cùng category, khác id)
function getRelatedPoems(id, category, limit = 3) {
  return POEMS_DATA.filter(p => p.category === category && p.id !== parseInt(id)).slice(0, limit);
}

// Tạo URL ảnh — fallback Picsum
function imgUrl(seed, w = 600, h = 420) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

// Ảnh Pexels trực tiếp — phù hợp chính xác nội dung từng bài thơ
// Format: https://images.pexels.com/photos/ID/pexels-photo-ID.jpeg?w=600&h=420&fit=crop
const POEM_PHOTOS = {
  // 1. Sương Mai Trên Đồng — ruộng lúa sương sớm Sapa
  "misty-field-dawn":        "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg",
  // 2. Lá Thu Vàng — lá vàng mùa thu
  "autumn-leaves-golden":    "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg",
  // 3. Bình Minh Trên Núi — núi mù sương Việt Nam
  "mountain-sunrise-fog":    "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
  // 4. Mưa Rừng — rừng mưa xanh
  "rain-forest-green":       "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg",
  // 5. Hoàng Hôn Biển — biển Việt Nam hoàng hôn
  "sunset-ocean-waves":      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
  // 6. Nhớ Em — cô gái áo dài Việt Nam
  "couple-rain-street":      "https://images.pexels.com/photos/29599647/pexels-photo-29599647.jpeg",
  // 7. Hẹn Ước Dưới Cây — đôi tình nhân Việt Nam
  "old-tree-couple-promise": "https://images.pexels.com/photos/901720/pexels-photo-901720.jpeg",
  // 8. Mưa Và Em — cô gái dưới mưa
  "rain-window-love":        "https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg",
  // 9. Khoảng Cách — người nhìn ra cửa sổ
  "distance-longing-window": "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg",
  // 10. Nụ Cười Em — cô gái Việt Nam nụ cười
  "smile-sunshine-portrait": "https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg",
  // 11. Phố Đêm — phố đêm Hà Nội
  "night-city-lights-street":"https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg",
  // 12. Buổi Sáng Bình Yên — cà phê sáng Việt Nam
  "morning-coffee-peaceful": "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
  // 13. Mẹ — mẹ Việt Nam ôm con
  "mother-hands-warm-light": "https://images.pexels.com/photos/4473871/pexels-photo-4473871.jpeg",
  // 14. Tuổi Thơ — trẻ em Việt Nam vui chơi
  "childhood-field-kite":    "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg",
  // 15. Vội Vàng — phố đông người vội vã
  "busy-city-rush-hour":     "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg",
  // 16. Giấc Mơ Xanh — rừng ánh sáng huyền ảo
  "dreamy-forest-light":     "https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg",
  // 17. Biển Trong Mơ — biển xanh Phú Quốc
  "dreamy-ocean-blue":       "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
  // 18. Cánh Cửa Xanh — cánh cửa xanh cổ kính
  "blue-door-mystery":       "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg",
  // 19. Bay Lên — bầu trời mây Việt Nam
  "flying-clouds-freedom":   "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg",
  // 20. Thành Phố Trong Mây — thành phố nhìn từ trên cao có mây
  "cloud-city-fantasy":      "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg",
};

function imgUrlSmart(seed, w = 600, h = 420) {
  const url = POEM_PHOTOS[seed];
  if (url) return `${url}?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}
