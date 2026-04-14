// ===== GENERATE PAGE =====

// Style option toggle
document.querySelectorAll(".style-opt").forEach(opt => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".style-opt").forEach(o => o.classList.remove("active"));
    opt.classList.add("active");
  });
});

// Mood toggle
document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mood-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Color toggle
document.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Char count
const topicInput = document.getElementById("poemTopic");
const charCount = document.getElementById("charCount");
if (topicInput) {
  topicInput.addEventListener("input", () => {
    charCount.textContent = `${topicInput.value.length}/100`;
  });
}

function setTopic(val) {
  if (topicInput) {
    topicInput.value = val;
    charCount.textContent = `${val.length}/100`;
    topicInput.focus();
  }
}

// ===== MAP CHỦ ĐỀ → BÀI THƠ PHÙ HỢP =====
const TOPIC_POEMS = {
  "nắng":       {
    "tu-tuyet": { title: "Nắng Ban Mai", lines: `Nắng ban mai chiếu xuống sân nhà,\nTô vàng từng giọt sương còn đọng xa.\nChim hót vang lời chào ngày mới,\nLòng người bỗng nhẹ, bỗng chan hòa.` },
    "hien-dai": { title: "Nắng", lines: `nắng rơi xuống\nnhẹ như lời thì thầm\n\nem ngồi đó\ntóc vàng trong nắng sớm\nnụ cười ấm hơn mặt trời\n\ntôi nhìn\nkhông dám nói\nchỉ để nắng\nnói hộ lòng mình.` },
    "luc-bat":  { title: "Nắng Vàng", lines: `Nắng vàng rọi xuống sân nhà,\nSưởi ấm lòng người sau đêm dài qua.\nHoa nở rộ trong vườn buổi sáng,\nNgày mới về, lòng thấy chan hòa.` },
    "haiku":    { title: "Nắng", lines: `Nắng ban mai lên\nSưởi ấm từng giọt sương đêm\nNgày mới bắt đầu.` }
  },
  "tình yêu":   {
    "tu-tuyet": { title: "Tình Yêu", lines: `Tình yêu như ánh nắng ban mai,\nSưởi ấm lòng người qua tháng ngày dài.\nDù có bão giông hay mưa lạnh,\nBên nhau, lòng vẫn thấy an bài.` },
    "hien-dai": { title: "Yêu", lines: `yêu\nkhông phải lúc nào\ncũng nói được\n\nđôi khi\nchỉ là\nngồi bên nhau\nim lặng\nmà lòng\nđầy ắp.` },
    "luc-bat":  { title: "Tình Yêu Đẹp", lines: `Tình yêu như ánh trăng rằm,\nSáng mãi trong lòng dù tháng năm qua.\nBên nhau ta vượt mọi gian nan,\nTình yêu đẹp mãi, chẳng phai mờ đi.` },
    "haiku":    { title: "Yêu", lines: `Em cười nhẹ thôi\nMà lòng tôi đã rung lên\nTình yêu là vậy.` }
  },
  "tình yêu đầu": {
    "tu-tuyet": { title: "Tình Yêu Đầu", lines: `Tình đầu như giấc mơ ban mai,\nĐẹp lắm nhưng tan khi nắng lên rồi.\nDù đã qua đi không trở lại,\nLòng vẫn giữ mãi một nụ cười.` },
    "hien-dai": { title: "Tình Đầu", lines: `tình đầu\nkhông ai quên được\n\ndù đã lâu\ndù đã có người khác\n\nvẫn có lúc\nnhớ lại\nnụ cười đó\nbuổi chiều đó\ncon đường đó.` },
    "luc-bat":  { title: "Tình Yêu Đầu", lines: `Tình đầu như giấc mơ đẹp,\nĐến rồi đi, để lòng ta nhớ mãi.\nDù đã qua đi không trở lại,\nLòng vẫn giữ mãi một nụ cười xinh.` },
    "haiku":    { title: "Tình Đầu", lines: `Tình đầu ngây thơ\nNhư hoa nở rồi lại tàn\nĐẹp mà không bền.` }
  },
  "mưa":        {
    "tu-tuyet": { title: "Mưa Rơi", lines: `Mưa rơi nhẹ trên mái nhà xưa,\nTiếng mưa như khúc nhạc buồn đưa.\nLòng tôi nhớ ai trong mưa lạnh,\nMột mình ngồi đợi, đợi mưa thưa.` },
    "hien-dai": { title: "Giọt Mưa", lines: `mưa rơi\ntrên phố vắng\n\ntôi đứng đây\nnhớ em\nnhư mưa nhớ đất\n\nmỗi giọt\nlà một lần\ntôi gọi tên em\nkhông thành tiếng.` },
    "luc-bat":  { title: "Mưa Và Nhớ", lines: `Mưa rơi trên mái nhà xưa,\nNhớ người đã khuất, lòng chưa nguôi ngoai.\nGió đưa hương cũ về đây,\nMắt ai long lanh, tay ai vẫy chào.` },
    "haiku":    { title: "Mưa", lines: `Mưa rơi lặng lẽ\nGiọt nước chạy dài trên kính\nLòng người nhớ ai.` }
  },
  "mưa chiều":  {
    "tu-tuyet": { title: "Mưa Chiều", lines: `Mưa chiều rơi nhẹ trên con đường,\nLá vàng theo gió, lòng vấn vương.\nNhớ ai đứng đó chiều hôm ấy,\nBây giờ đã khuất, lòng còn thương.` },
    "hien-dai": { title: "Mưa Chiều Nay", lines: `chiều nay mưa\nkhông báo trước\n\ntôi đứng ở cửa sổ\nnhìn những giọt nước\nchạy dài\n\nnhớ em\ncũng đến như mưa\nrồi đi\nkhông nói gì.` },
    "luc-bat":  { title: "Chiều Mưa Nhớ", lines: `Chiều về mưa rơi nhẹ nhàng,\nLòng tôi bỗng nhớ một người xa xăm.\nNhớ chiều xưa đứng bên nhau,\nMưa rơi ướt áo, lòng đau khó nguôi.` },
    "haiku":    { title: "Mưa Chiều", lines: `Mưa chiều lất phất\nHương hoa cũ còn vương đây\nNhớ ai xa xôi.` }
  },
  // Biển
  "biển":       {
    "tu-tuyet": { title: "Biển Chiều", lines: `Biển chiều xanh thẳm đến chân trời,\nSóng vỗ bờ như tiếng thở dài.\nTôi đứng đây nhìn mây trôi mãi,\nNhớ em như biển nhớ xa khơi.` },
    "hien-dai": { title: "Biển", lines: `tôi đứng trước biển\nkhông nói gì\n\nbiển cũng không nói\nnhưng hiểu tất cả\n\nchỉ có sóng\nvỗ bờ\nnhư tiếng thở dài\ncủa người\nđang nhớ.` },
    "luc-bat":  { title: "Biển Và Nhớ", lines: `Biển xanh sóng vỗ bờ xa,\nLòng tôi nhớ mãi người đà đi xa.\nSóng dâng rồi lại rút về,\nNhư tình ta đó, đến rồi lại đi.` },
    "haiku":    { title: "Biển", lines: `Sóng vỗ bờ xa\nMặt trời chìm xuống biển sâu\nLòng người bâng khuâng.` }
  },
  "biển xanh":  {
    "tu-tuyet": { title: "Biển Xanh", lines: `Biển xanh trong vắt đến tận trời,\nCát trắng mịn màng dưới nắng tươi.\nSóng biển vỗ về bao kỷ niệm,\nLòng tôi bình yên, nhẹ tựa mây trôi.` },
    "hien-dai": { title: "Biển Xanh", lines: `biển xanh\nxanh đến tận trời\n\ntôi đứng đây\nnhỏ bé\nnhư một hạt cát\n\nnhưng lòng\nrộng như biển\nkhi nghĩ đến em.` },
    "luc-bat":  { title: "Biển Xanh Bình Yên", lines: `Biển xanh sóng nhẹ bình yên,\nCát vàng trải rộng dưới trời nắng trong.\nLòng người bỗng nhẹ thênh thang,\nBiển ơi, ta muốn ở đây mãi thôi.` },
    "haiku":    { title: "Biển Xanh", lines: `Biển xanh vô tận\nSóng vỗ bờ cát trắng mịn\nLòng người bình yên.` }
  },
  // Mùa thu
  "mùa thu":    {
    "tu-tuyet": { title: "Mùa Thu", lines: `Mùa thu về mang lá vàng rơi,\nGió thổi qua mang hương cỏ trời.\nLòng người bỗng nhớ bao kỷ niệm,\nThu về, lòng lại thấy bâng khuâng thôi.` },
    "luc-bat":  { title: "Thu Về", lines: `Thu về lá đỏ khắp nơi,\nGió đưa hương cũ, lòng người bâng khuâng.\nNhớ ai đứng đó một lần,\nBây giờ đã khuất, còn chăng bóng hình.\nThu ơi, sao cứ vô tình,\nMang theo kỷ niệm, để mình nhớ thương.` },
    "hien-dai": { title: "Thu", lines: `thu về\nlá rơi\nkhông hỏi\n\ntôi ngồi nhặt\ntừng chiếc lá\nnhư nhặt lại\nnhững ngày\nđã qua.` },
    "haiku":    { title: "Thu", lines: `Lá vàng rơi nhẹ\nGió thu mang hương cỏ dại\nLòng người bâng khuâng.` }
  },
  "thu":        {
    "haiku":    { title: "Thu", lines: `Lá vàng rơi nhẹ\nGió thu mang hương cỏ dại\nLòng người bâng khuâng.` },
    "tu-tuyet": { title: "Mùa Thu", lines: `Mùa thu về mang lá vàng rơi,\nGió thổi qua mang hương cỏ trời.\nLòng người bỗng nhớ bao kỷ niệm,\nThu về, lòng lại thấy bâng khuâng thôi.` },
    "hien-dai": { title: "Thu", lines: `thu về\nlá rơi\nkhông hỏi\n\ntôi ngồi nhặt\ntừng chiếc lá\nnhư nhặt lại\nnhững ngày\nđã qua.` },
    "luc-bat":  { title: "Thu Về", lines: `Thu về lá đỏ khắp nơi,\nGió đưa hương cũ, lòng người bâng khuâng.\nNhớ ai đứng đó một lần,\nBây giờ đã khuất, còn chăng bóng hình.` }
  },
  // Mẹ
  "mẹ":         {
    "hien-dai": { title: "Mẹ", lines: `mẹ gọi điện\nhỏi con ăn chưa\ntôi nói rồi\nnhưng thực ra chưa\n\nmẹ không biết\ntôi đang ngồi một mình\ngiữa căn phòng trọ\nnhớ mùi cơm mẹ nấu\n\ncó những thứ\nkhông thể nói qua điện thoại\nnhưng mẹ vẫn hiểu\nbằng cách nào đó.` },
    "tu-tuyet": { title: "Nhớ Mẹ", lines: `Đôi tay mẹ gầy theo năm tháng,\nNhăn nheo nhưng ấm áp vô cùng.\nBao nhiêu năm mẹ lo cho con,\nQuên đi bản thân, chỉ biết yêu thương.` },
    "luc-bat":  { title: "Mẹ Hiền", lines: `Mẹ ơi, tóc mẹ bạc rồi,\nBao năm vất vả, mẹ ngồi đợi con.\nCon đi xa mãi không về,\nMẹ ngồi nhớ mãi, lòng đau khó nguôi.\nMẹ ơi, con nhớ mẹ nhiều,\nDù đi muôn nẻo, lòng vẫn nhớ thương.` },
    "haiku":    { title: "Mẹ", lines: `Tóc mẹ bạc trắng\nĐôi tay gầy vẫn ấm áp\nCon nhớ mẹ nhiều.` }
  },
  "nhớ mẹ":     {
    "hien-dai": { title: "Nhớ Mẹ", lines: `xa nhà đã lâu\ntôi quên mất mùi bếp củi\n\nnhưng mỗi khi mưa\ntôi lại nhớ\nmẹ đứng ở cửa\nchờ con về\n\ngiờ này mẹ có ngủ không\nhay vẫn thức\nnhớ con như tôi nhớ mẹ.` },
    "tu-tuyet": { title: "Nhớ Mẹ", lines: `Nhớ mẹ như nhớ ánh trăng rằm,\nSáng mãi trong lòng dù tháng năm.\nMẹ ở quê nhà, con ở xa,\nNhớ mẹ, lòng con thấy bâng khuâng.` },
    "luc-bat":  { title: "Nhớ Mẹ Hiền", lines: `Nhớ mẹ như nhớ bóng trăng,\nSáng mãi trong lòng dù tháng năm qua.\nMẹ ơi, con nhớ mẹ nhiều,\nDù đi muôn nẻo, lòng vẫn hướng về.` },
    "haiku":    { title: "Nhớ Mẹ", lines: `Mưa rơi chiều nay\nNhớ mẹ đứng chờ ở cửa\nLòng con bâng khuâng.` }
  },
  // Tình yêu
  "tình yêu":   { "tu-tuyet": { title: "Tình Yêu", lines: `Tình yêu như ánh nắng ban mai,\nSưởi ấm lòng người qua tháng ngày dài.\nDù có bão giông hay mưa lạnh,\nBên nhau, lòng vẫn thấy an bài.` } },
  "tình yêu đầu": { "tu-tuyet": { title: "Tình Yêu Đầu", lines: `Tình đầu như giấc mơ ban mai,\nĐẹp lắm nhưng tan khi nắng lên rồi.\nDù đã qua đi không trở lại,\nLòng vẫn giữ mãi một nụ cười.` } },
  // Nhớ nhà / quê hương
  "nhớ nhà":    { "luc-bat": { title: "Nhớ Nhà", lines: `Xa nhà đã mấy mùa đông,\nNhớ con đường nhỏ, nhớ dòng sông xưa.\nMẹ già tóc bạc đợi chờ,\nCon đi biền biệt, bao giờ mới về.\nQuê hương ơi, đất mẹ hiền,\nDù đi muôn nẻo, lòng vẫn hướng về.` } },
  "quê hương":  { "luc-bat": { title: "Quê Hương", lines: `Quê hương là chốn bình yên,\nNơi ta sinh ra, lớn lên từng ngày.\nDù đi xa mãi đến đâu,\nLòng vẫn nhớ mãi những ngày thơ ấu.\nQuê hương ơi, mãi trong tim,\nDù bao năm tháng, chẳng hề phai mờ.` } },
  // Hoàng hôn
  "hoàng hôn":  { "tu-tuyet": { title: "Hoàng Hôn", lines: `Hoàng hôn đỏ rực cuối chân trời,\nNhuộm vàng cả một góc bầu trời.\nTôi ngồi đây nhìn ngày tàn dần,\nNhớ em như nhớ ánh mặt trời.` } },
  // Trăng
  "trăng":      { "haiku": { title: "Trăng Đêm", lines: `Trăng lên một mình\nSoi bóng kẻ cô đơn ngồi\nGió thổi lạnh lòng.` }, "tu-tuyet": { title: "Đêm Trăng", lines: `Trăng lên soi sáng cả đêm dài,\nBạc trắng mái nhà, trắng cả vai.\nTôi ngồi nhớ mãi người năm cũ,\nTrăng vẫn tròn, người đã đi rồi.` } },
  // Hoa
  "hoa":        { "tu-tuyet": { title: "Hoa Nở", lines: `Hoa nở rộ trong vườn buổi sáng,\nHương thơm bay nhẹ khắp không gian.\nOng bướm lượn quanh tìm mật ngọt,\nLòng người bỗng nhẹ, bỗng bình an.` } },
  // Trăng
  "trăng":      { "tu-tuyet": { title: "Đêm Trăng", lines: `Trăng lên soi sáng cả đêm dài,\nBạc trắng mái nhà, trắng cả vai.\nTôi ngồi nhớ mãi người năm cũ,\nTrăng vẫn tròn, người đã đi rồi.` }, "haiku": { title: "Trăng Đêm", lines: `Trăng lên một mình\nSoi bóng kẻ cô đơn ngồi\nGió thổi lạnh lòng.` } },
  // Hoa
  "hoa":        { "tu-tuyet": { title: "Hoa Nở", lines: `Hoa nở rộ trong vườn buổi sáng,\nHương thơm bay nhẹ khắp không gian.\nOng bướm lượn quanh tìm mật ngọt,\nLòng người bỗng nhẹ, bỗng bình an.` }, "haiku": { title: "Hoa Ban Mai", lines: `Hoa nở ban mai\nGiọt sương còn đọng cánh hoa\nĐẹp đến nao lòng.` } },
  // Gió
  "gió":        { "tu-tuyet": { title: "Gió Chiều", lines: `Gió chiều thổi nhẹ qua hàng cây,\nMang theo hương cỏ dại đâu đây.\nLòng tôi bỗng nhớ người năm cũ,\nGió đưa kỷ niệm về chốn này.` }, "hien-dai": { title: "Gió", lines: `gió thổi qua\nkhông để lại dấu vết\n\nnhưng tôi biết\ngió đã đến\nvì lá cây\nkhẽ rung\n\nem cũng vậy\nđi rồi\nnhưng lòng tôi\nvẫn còn rung.` } },
  // Rừng
  "rừng":       { "tu-tuyet": { title: "Rừng Xanh", lines: `Rừng xanh thẳm, tiếng chim ca vang,\nÁnh nắng len qua kẽ lá vàng.\nTôi đứng đây giữa rừng tĩnh lặng,\nLòng bỗng bình yên, nhẹ nhàng thêm.` }, "hien-dai": { title: "Trong Rừng", lines: `đứng giữa rừng\nnghe tiếng lá thở\n\ncây cối không nói\nnhưng hiểu tất cả\n\ntôi đến đây\nđể bỏ lại\nnhững gì\nthành phố\nchất lên vai.` } },
  // Mùa xuân
  "mùa xuân":   { "tu-tuyet": { title: "Xuân Về", lines: `Xuân về hoa nở khắp vườn xanh,\nBướm lượn ong bay, cảnh thật xinh.\nLòng người bỗng nhẹ như mây trắng,\nQuên hết ưu phiền, sống thật tình.` }, "luc-bat": { title: "Mùa Xuân", lines: `Xuân về mang nắng ấm vào,\nHoa đào nở rộ, trời cao xanh ngần.\nLòng người bỗng nhẹ bâng khuâng,\nNhớ ai đứng đó, nhớ lần gặp nhau.\nXuân ơi, sao đến rồi đi,\nĐể lòng ta mãi nhớ ghi không quên.` } },
  // Sương mai
  "sương mai":  { "tu-tuyet": { title: "Sương Mai", lines: `Sương mai phủ nhẹ trên đồng xanh,\nGiọt nước long lanh như mắt anh.\nChim hót vang lời chào buổi sáng,\nLòng tôi bỗng nhẹ, bỗng thanh thanh.` }, "haiku": { title: "Sương Sớm", lines: `Sương mai còn đọng\nTrên từng ngọn cỏ xanh tươi\nNắng lên, tan dần.` } },
  // Bình minh
  "bình minh":  { "tu-tuyet": { title: "Bình Minh", lines: `Bình minh lên, ánh sáng tràn về,\nNhuộm hồng cả một góc trời quê.\nChim hót vang lời chào ngày mới,\nLòng người bỗng nhẹ, bỗng tràn trề.` }, "hien-dai": { title: "Bình Minh Mới", lines: `mỗi sáng\nmặt trời lại mọc\n\nnhắc tôi rằng\ndù hôm qua\ncó tối đến đâu\n\nbình minh\nvẫn đến\nchỉ cần\nta đủ kiên nhẫn\nchờ.` } },
  // Giấc mơ
  "giấc mơ":    { "tu-tuyet": { title: "Giấc Mơ", lines: `Trong giấc mơ tôi thấy em về,\nNụ cười như nắng, nhẹ như mây.\nTôi muốn ngủ mãi trong giấc đó,\nĐừng đánh thức tôi, dù trời đã ngày.` }, "hien-dai": { title: "Giấc Mơ Xanh", lines: `tôi mơ thấy\nmột khu rừng xanh\nnơi thời gian đứng lại\n\nem ngồi đó\nmỉm cười\nnhư chưa bao giờ\nchia tay\n\ntỉnh dậy rồi\ntay vẫn vươn\nmuốn nắm lấy\ngiấc mơ.` } },
  // Tự do
  "tự do":      { "tu-tuyet": { title: "Tự Do", lines: `Tự do như cánh chim bay cao,\nVượt qua mây trắng, vượt trời sao.\nLòng người bỗng nhẹ khi được sống,\nThật với chính mình, chẳng lo âu.` }, "hien-dai": { title: "Bay Lên", lines: `đêm qua tôi mơ\nmình được bay\n\nvượt qua mây trắng\nvượt trời mây\n\nnhìn xuống thấy đời\nnhỏ bé quá\n\nnhững lo âu\ntan biến từng ngày\n\ntỉnh dậy rồi\ntay vẫn còn vươn\nmuốn nắm lấy\ngiấc mơ đêm trước.` } },
  // Chia tay
  "chia tay":   { "tu-tuyet": { title: "Chia Tay", lines: `Chia tay rồi, lòng vẫn còn đau,\nNhớ những ngày xưa, nhớ mãi không thôi.\nBàn tay buông ra, mắt nhìn theo mãi,\nMột lần chia tay, nghìn lần nhớ thôi.` }, "hien-dai": { title: "Ngày Chia Tay", lines: `hôm đó\nem quay đi\nkhông ngoảnh lại\n\ntôi đứng đó\nnhìn theo\ncho đến khi\nbóng em\nkhuất sau góc phố\n\nvà tôi hiểu\ncó những điều\nkhi mất rồi\nmới biết\nquý.` } },
  // Cô đơn
  "cô đơn":     { "hien-dai": { title: "Một Mình", lines: `một mình\ngiữa đám đông\nvẫn cô đơn\n\ntiếng cười xung quanh\nnhưng lòng\nlặng như tờ\n\ncô đơn không phải\nkhi không có ai\nmà khi\nkhông ai\nhiểu mình.` }, "tu-tuyet": { title: "Cô Đơn", lines: `Cô đơn ngồi giữa đêm dài,\nNhìn trăng một mình, lòng thấy tái.\nNhớ ai đã khuất không trở lại,\nCô đơn — hai chữ, ngàn nỗi đau.` } },
  // Hạnh phúc
  "hạnh phúc":  { "tu-tuyet": { title: "Hạnh Phúc", lines: `Hạnh phúc đôi khi chỉ là thế,\nMột buổi sáng trong, một tách trà.\nNgồi bên nhau, không cần nói nhiều,\nLòng bình yên — đó là hạnh phúc ta.` } },
  // Hy vọng
  "hy vọng":    { "tu-tuyet": { title: "Hy Vọng", lines: `Dù đêm dài, bình minh vẫn đến,\nDù mưa to, nắng vẫn trở về.\nHy vọng như ngọn đèn trong tối,\nSoi sáng lòng ta, dù khó khăn gì.` } },
  // Sương mai
  "sương mai":  { "tu-tuyet": { title: "Sương Mai", lines: `Sương mai phủ nhẹ trên đồng xanh,\nGiọt nước long lanh như mắt anh.\nChim hót vang lời chào buổi sáng,\nLòng tôi bỗng nhẹ, bỗng thanh thanh.` } },
  // Bình minh
  "bình minh":  { "tu-tuyet": { title: "Bình Minh", lines: `Bình minh lên, ánh sáng tràn về,\nNhuộm hồng cả một góc trời quê.\nChim hót vang lời chào ngày mới,\nLòng người bỗng nhẹ, bỗng tràn trề.` } },
  // Phố đêm
  "phố đêm":    { "hien-dai": { title: "Phố Đêm", lines: `đèn đường vàng\nchiếu xuống lối đi\n\nbước chân ai đó\nvội vàng về\n\nphố đêm ôm trọn\nbao câu chuyện\ncủa những người\nkhông ai biết tên.` } },
  // Cà phê / buổi sáng
  "cà phê":     { "hien-dai": { title: "Cà Phê Sáng", lines: `một mình\nvới ly cà phê\nbuổi sáng\n\nnhìn ra cửa sổ\nphố còn ngủ\nchỉ có tôi\nvà những suy nghĩ\nchưa kịp tên.` } },
  "buổi sáng":  { "tu-tuyet": { title: "Buổi Sáng", lines: `Buổi sáng trong lành, nắng nhẹ bay,\nChim hót vang lời chào ngày mới đây.\nCà phê thơm ngát bên trang sách,\nLòng người bình yên, nhẹ tựa mây.` } },
};

// Lấy bài thơ phù hợp với chủ đề VÀ phong cách
function getPoemForTopic(topic, style, mood) {
  const t = (topic || "").toLowerCase().trim();

  function fromMap(stylePoems) {
    // Ưu tiên đúng phong cách
    if (stylePoems[style]) return stylePoems[style];
    // Fallback: lấy bài đầu tiên trong map
    return Object.values(stylePoems)[0];
  }

  // 1. Khớp chủ đề chính xác
  if (TOPIC_POEMS[t]) return fromMap(TOPIC_POEMS[t]);

  // 2. Khớp từ khóa trong chủ đề
  for (const key of Object.keys(TOPIC_POEMS)) {
    if (t.includes(key) || key.includes(t)) return fromMap(TOPIC_POEMS[key]);
  }

  // 3. Theo cảm xúc — lọc từ POEM_BANK theo mood
  const moodMap = {
    buon:       { "tu-tuyet": { title: "Nỗi Buồn", lines: `Ngồi đây một mình trong đêm vắng,\nNhớ ai đã khuất, lòng chưa nguôi.\nMưa rơi ngoài kia như tiếng khóc,\nLòng tôi buồn mãi, chẳng thể vơi.` }, "hien-dai": { title: "Buồn", lines: `tôi ngồi đây\nkhông biết vì sao buồn\n\nchỉ biết rằng\ntrời hôm nay\nxám hơn mọi ngày\n\nvà lòng tôi\ncũng vậy.` }, "luc-bat": { title: "Nỗi Buồn Dài", lines: `Buồn như mưa rơi không ngừng,\nLòng tôi trống rỗng, bâng khuâng một mình.\nNhớ ai đã khuất bóng hình,\nĐể lòng ta mãi lặng thinh một mình.` }, "haiku": { title: "Buồn", lines: `Mưa rơi lặng lẽ\nLòng người buồn không nói được\nChỉ ngồi nhìn mưa.` } },
    vui:        { "tu-tuyet": { title: "Niềm Vui", lines: `Hôm nay trời sáng, lòng thêm vui,\nNắng vàng rọi xuống khắp nơi nơi.\nChim hót vang lời chào ngày mới,\nLòng người bỗng nhẹ, bỗng tươi cười.` }, "hien-dai": { title: "Vui", lines: `hôm nay\ntôi cười\nkhông vì lý do gì\n\nchỉ vì\ntrời đẹp\nvà lòng nhẹ\nvà cuộc sống\nthật đáng sống.` }, "haiku": { title: "Vui", lines: `Nắng ban mai lên\nChim hót vang lời chào ngày\nLòng người thêm vui.` } },
    nho:        { "tu-tuyet": { title: "Nhớ Nhung", lines: `Nhớ ai như nhớ áng mây trôi,\nTrôi mãi xa rồi, chẳng trở lại.\nLòng tôi nhớ mãi một bóng hình,\nDù năm tháng qua, vẫn chẳng phai.` }, "hien-dai": { title: "Nhớ", lines: `nhớ\nkhông phải vì muốn nhớ\n\nmà vì\ncó những thứ\nkhắc vào lòng\nrồi không thể\nxóa đi được.` }, "haiku": { title: "Nhớ", lines: `Gió thổi qua đây\nMang hương cũ về chốn này\nLòng lại nhớ ai.` } },
    "binh-yen": { "tu-tuyet": { title: "Bình Yên", lines: `Bình yên như buổi sáng trong lành,\nGió nhẹ thổi qua, lòng thanh thanh.\nCà phê thơm ngát bên trang sách,\nMột ngày mới đến, nhẹ nhàng xanh.` }, "hien-dai": { title: "Bình Yên", lines: `bình yên\nkhông phải không có gì\n\nmà là\ncó tất cả\nnhưng lòng\nvẫn nhẹ.` }, "haiku": { title: "Bình Yên", lines: `Sáng sớm yên tĩnh\nTiếng chim hót xa xa\nLòng người bình yên.` } },
    "lang-man": { "tu-tuyet": { title: "Lãng Mạn", lines: `Đêm nay trăng sáng, gió nhẹ bay,\nEm ngồi bên tôi, tay trong tay.\nLời yêu chưa nói, mắt đã nói,\nLãng mạn thay, đêm nay đẹp thay.` }, "hien-dai": { title: "Lãng Mạn", lines: `em cười\nvà tôi quên mất\nmình đang nói gì\n\nchỉ biết rằng\nkhoảnh khắc này\nđẹp hơn\nbất kỳ bài thơ nào.` }, "haiku": { title: "Lãng Mạn", lines: `Trăng sáng đêm nay\nEm ngồi bên tôi lặng yên\nLòng tôi đầy ắp.` } },
    "huyen-bi": { "tu-tuyet": { title: "Huyền Bí", lines: `Trong giấc mơ có một cánh cửa,\nMàu xanh như trời, như biển sâu.\nTôi đứng trước cửa, tay run rẩy,\nKhông biết phía sau là gì đâu.` }, "hien-dai": { title: "Huyền Bí", lines: `có những điều\nkhông giải thích được\n\nnhư tại sao\ntôi nhớ em\ntrong một giấc mơ\nmà chưa bao giờ\ngặp mặt.` }, "haiku": { title: "Huyền Bí", lines: `Sương mù bao phủ\nCánh cửa xanh ẩn hiện\nBí ẩn chưa mở.` } },
  };

  if (mood && moodMap[mood]) {
    const mp = moodMap[mood];
    if (mp[style]) return mp[style];
    return Object.values(mp)[0];
  }

  return null; // fallback về POEM_BANK đúng style
}


const POEM_BANK = {
  "luc-bat": [
    { title: "Mưa Chiều Nhớ Ai", lines: `Mưa chiều rơi nhẹ trên sân,\nNhớ người đã khuất, lòng chưa nguôi ngoai.\nGió đưa hương cũ về đây,\nMắt ai long lanh, tay ai vẫy chào.\nThời gian như nước qua cầu,\nChỉ còn kỷ niệm đậm màu trong tim.` },
    { title: "Chiều Vàng Xa Xứ", lines: `Chiều về trên những con đường,\nLá vàng rơi nhẹ, vấn vương lòng người.\nNhớ ai đứng đó mỉm cười,\nBây giờ đã khuất chân trời xa xăm.\nTình yêu như áng mây trắng,\nThoáng qua rồi mất, để lòng bâng khuâng.` },
    { title: "Đêm Nghe Mưa Rơi", lines: `Đêm nay mưa rơi trên mái nhà,\nTiếng mưa như tiếng ai thì thầm xa.\nLòng tôi bỗng nhớ ngày xưa đó,\nHai đứa ngồi nghe mưa, chẳng nói gì.\nBây giờ mỗi đứa một phương trời,\nMưa vẫn rơi, nhưng lòng đã nguội rồi.` },
    { title: "Quê Hương Trong Mơ", lines: `Xa quê đã mấy mùa thu,\nNhớ con đường nhỏ, nhớ bờ ao xưa.\nMẹ già tóc bạc đợi chờ,\nCon đi biền biệt, bao giờ mới về.\nQuê hương ơi, đất mẹ hiền,\nDù đi muôn nẻo, lòng vẫn hướng về.` },
  ],
  "tu-tuyet": [
    { title: "Sương Mai", lines: `Sương mai phủ nhẹ trên đồng xanh,\nGiọt nước long lanh như mắt anh.\nChim hót vang lời chào buổi sáng,\nLòng tôi bỗng nhẹ, bỗng thanh thanh.` },
    { title: "Lá Thu Rơi", lines: `Lá vàng rơi nhẹ trước hiên nhà,\nMùa thu về mang theo nỗi xa.\nGió thổi qua mang hương cỏ dại,\nLòng tôi bỗng nhớ những ngày qua.` },
    { title: "Hoàng Hôn Biển", lines: `Mặt trời chìm xuống biển xa khơi,\nNhuộm đỏ cả một góc chân trời.\nSóng vỗ bờ như tiếng thở dài,\nCủa biển cả nhớ thương ai rồi.` },
    { title: "Đêm Trăng Một Mình", lines: `Trăng lên soi bóng kẻ cô đơn,\nNgồi đây nhớ mãi chuyện xa hơn.\nGió thổi qua mang hương hoa cũ,\nLòng bỗng dưng thấy nhớ ai hơn.` },
    { title: "Mùa Xuân Đến", lines: `Xuân về hoa nở khắp vườn xanh,\nBướm lượn ong bay, cảnh thật xinh.\nLòng người bỗng nhẹ như mây trắng,\nQuên hết ưu phiền, sống thật tình.` },
  ],
  "hien-dai": [
    { title: "Khoảng Trống", lines: `tôi ngồi đây\ngiữa thành phố ồn ào\nnhớ một buổi chiều\ntrên cánh đồng vắng\n\nem đứng đó\ntóc bay trong gió\nnụ cười như nắng\ntan vào không gian\n\nbây giờ\nchỉ còn tiếng xe\nvà khoảng trống\nmang tên em.` },
    { title: "Giọt Mưa Cuối Mùa", lines: `mưa không báo trước\ncũng như em đến\nrồi đi\n\ntôi đứng ở cửa sổ\nnhìn những giọt nước\nchạy dài trên kính\n\nmỗi giọt\nlà một kỷ niệm\ntan vào đất\n\nvà tôi\nvẫn đứng đây\nchờ mưa tạnh.` },
    { title: "Thành Phố Không Ngủ", lines: `3 giờ sáng\nthành phố vẫn thức\nnhư tôi\n\nđèn đường vàng\nchiếu xuống những bóng người\nai cũng có một nỗi riêng\n\ntôi đi bộ\nkhông biết về đâu\nchỉ biết rằng\nđêm nay\nrất dài.` },
    { title: "Mẹ Và Tôi", lines: `mẹ gọi điện\nhỏi con ăn chưa\ntôi nói rồi\nnhưng thực ra chưa\n\nmẹ không biết\ntôi đang ngồi một mình\ngiữa căn phòng trọ\nnhớ mùi cơm mẹ nấu\n\ncó những thứ\nkhông thể nói qua điện thoại\nnhưng mẹ vẫn hiểu\nbằng cách nào đó.` },
  ],
  "haiku": [
    { title: "Lá Thu", lines: `Lá vàng rơi nhẹ\nSương mai còn đọng trên cành\nEm đã đi rồi.` },
    { title: "Mưa Chiều", lines: `Mưa chiều lất phất\nHương hoa cũ còn vương đây\nNhớ ai xa xôi.` },
    { title: "Trăng Đêm", lines: `Trăng lên một mình\nSoi bóng kẻ cô đơn ngồi\nGió thổi lạnh lòng.` },
    { title: "Biển Sáng", lines: `Sóng vỗ bờ xa\nMặt trời lên từ biển sâu\nNgày mới bắt đầu.` },
    { title: "Hoa Nở", lines: `Hoa nở ban mai\nGiọt sương còn đọng cánh hoa\nĐẹp đến nao lòng.` },
  ],
};

const IMG_SEEDS_BY_COLOR = {
  warm:   ["sunset-warm-golden", "autumn-leaves-golden", "morning-coffee-peaceful", "sunrise-warm-field"],
  cool:   ["rain-forest-green", "misty-field-dawn", "blue-door-mystery", "rain-window-love"],
  dreamy: ["dreamy-forest-light", "dreamy-ocean-blue", "cloud-city-fantasy", "flying-clouds-freedom"],
  dark:   ["night-city-lights-street", "distance-longing-window", "couple-rain-street", "old-tree-couple-promise"],
  nature: ["mountain-sunrise-fog", "misty-field-dawn", "rain-forest-green", "autumn-leaves-golden"],
};

let generatedHistory = [];

function generatePoem() {
  const topic = topicInput ? topicInput.value.trim() : "";
  const style = document.querySelector(".style-opt.active")?.dataset.value || "tu-tuyet";
  const mood = document.querySelector(".mood-btn.active")?.dataset.mood || "buon";
  const color = document.querySelector(".color-btn.active")?.dataset.color || "warm";

  const btn = document.getElementById("generateBtn");
  const btnText = document.getElementById("btnText");
  const placeholder = document.getElementById("resultPlaceholder");
  const content = document.getElementById("resultContent");

  btn.classList.add("loading");
  btnText.textContent = "Đang tạo...";
  if (content) content.style.display = "none";
  if (placeholder) placeholder.style.display = "flex";

  setTimeout(() => {
    const bank = POEM_BANK[style] || POEM_BANK["tu-tuyet"];
    const topicPoem = getPoemForTopic(topic, style, mood);
    const chosen = topicPoem || bank[Math.floor(Math.random() * bank.length)];
    const styleLabels = { "luc-bat": "Lục Bát", "tu-tuyet": "Tứ Tuyệt", "hien-dai": "Hiện Đại", "haiku": "Haiku" };
    const moodLabels = { buon: "Buồn", vui: "Vui", nho: "Nhớ Nhung", "binh-yen": "Bình Yên", "lang-man": "Lãng Mạn", "huyen-bi": "Huyền Bí" };

    // Chọn ảnh phù hợp với chủ đề + cảm xúc + tông màu
    const imgUrl = getTopicImage(topic, color, mood);

    // Inject result
    document.getElementById("resultImg").src = imgUrl;
    document.getElementById("resultTitle").textContent = `"${chosen.title}"`;
    document.getElementById("resultText").innerHTML = chosen.lines.replace(/\n/g, "<br />");
    document.getElementById("resultTag").textContent = topic || styleLabels[style];
    document.getElementById("resultStyle").textContent = "📝 " + styleLabels[style];
    document.getElementById("resultMood").textContent = "💭 " + (moodLabels[mood] || mood);

    if (placeholder) placeholder.style.display = "none";
    if (content) content.style.display = "flex";

    // Save to history
    generatedHistory.unshift({ title: chosen.title, lines: chosen.lines, imgUrl, style: styleLabels[style] });
    renderHistory();

    btn.classList.remove("loading");
    btnText.textContent = "Tạo Thơ";
  }, 1600);
}

function renderHistory() {
  const section = document.getElementById("genHistory");
  const grid = document.getElementById("historyGrid");
  if (!section || !grid || generatedHistory.length === 0) return;
  section.style.display = "block";
  grid.innerHTML = generatedHistory.slice(0, 8).map(h => `
    <div class="history-card">
      <img src="${h.imgUrl || imgUrlSmart(h.seed, 300, 200)}" alt="${h.title}" loading="lazy" />
      <div class="history-body">
        <h4>"${h.title}"</h4>
        <p>${h.lines.split("\n")[0]}</p>
      </div>
    </div>`).join("");
}

// ── Chọn ảnh phù hợp với chủ đề + cảm xúc + tông màu ──
// Mỗi chủ đề có nhiều ảnh → random mỗi lần tạo
const TOPIC_IMAGES = {
  "nắng":       ["https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg","https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg","https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg"],
  "ánh nắng":   ["https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg","https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg"],
  "mùa thu":    ["https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg","https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg","https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg"],
  "thu":        ["https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg","https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"],
  "lá vàng":    ["https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg","https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"],
  "mưa":        ["https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg","https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg","https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg"],
  "mưa chiều":  ["https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg","https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg","https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg"],
  "biển":       ["https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg","https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg","https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg"],
  "biển xanh":  ["https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg","https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg","https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg"],
  "núi":        ["https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg","https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg","https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"],
  "sương":      ["https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg","https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg"],
  "sương mai":  ["https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg","https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg","https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"],
  "rừng":       ["https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg","https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg","https://images.pexels.com/photos/448375/pexels-photo-448375.jpeg"],
  "hoàng hôn":  ["https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg","https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg","https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"],
  "bình minh":  ["https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg","https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg","https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg"],
  "hoa":        ["https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg","https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg","https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg"],
  "mùa xuân":   ["https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg","https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg","https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"],
  "trăng":      ["https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg","https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg"],
  "sao":        ["https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg","https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg","https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg"],
  "mây":        ["https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg","https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg"],
  "gió":        ["https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg","https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"],
  "tình yêu":       ["https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg","https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg","https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg"],
  "tình yêu đầu":   ["https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg","https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg"],
  "nhớ em":         ["https://images.pexels.com/photos/29599647/pexels-photo-29599647.jpeg","https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg"],
  "em":             ["https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg","https://images.pexels.com/photos/29599647/pexels-photo-29599647.jpeg"],
  "nụ cười":        ["https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg","https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"],
  "mẹ":             ["https://images.pexels.com/photos/4473871/pexels-photo-4473871.jpeg","https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg"],
  "nhớ mẹ":         ["https://images.pexels.com/photos/4473871/pexels-photo-4473871.jpeg","https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg"],
  "gia đình":       ["https://images.pexels.com/photos/4473871/pexels-photo-4473871.jpeg","https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg"],
  "tuổi thơ":       ["https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg","https://images.pexels.com/photos/35537/child-children-girl-happy.jpg"],
  "trẻ em":         ["https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg","https://images.pexels.com/photos/35537/child-children-girl-happy.jpg"],
  "chia tay":       ["https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg","https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg"],
  "cô đơn":         ["https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg","https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg"],
  "hạnh phúc":      ["https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg","https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg","https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg"],
  "hy vọng":        ["https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg","https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg"],
  "phố":            ["https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg","https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg"],
  "phố đêm":        ["https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg","https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg"],
  "sài gòn":        ["https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg","https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg"],
  "hà nội":         ["https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg","https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg"],
  "cà phê":         ["https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg","https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg"],
  "buổi sáng":      ["https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg","https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg"],
  "nhớ nhà":        ["https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg","https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"],
  "quê hương":      ["https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg","https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg"],
  "giấc mơ":        ["https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg","https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg","https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg"],
  "mơ":             ["https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg","https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg"],
  "tự do":          ["https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg","https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg"],
};

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Ảnh theo cảm xúc (dùng khi không khớp chủ đề)
const MOOD_IMAGES = {
  buon:      "https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg", // mưa buồn
  vui:       "https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg", // nụ cười vui
  nho:       "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg", // cửa sổ nhớ nhung
  "binh-yen":"https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",   // cà phê bình yên
  "lang-man":"https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg", // đôi tình nhân
  "huyen-bi":"https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg",   // rừng huyền bí
};

// Ảnh theo tông màu (fallback cuối cùng)
const COLOR_IMAGES = {
  warm:   "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg",
  cool:   "https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg",
  dreamy: "https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg",
  dark:   "https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg",
  nature: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg",
};

function getTopicImage(topic, color, mood) {
  const t = (topic || "").toLowerCase().trim();
  const suffix = "?auto=compress&cs=tinysrgb&w=700&h=400&fit=crop";
  // 1. Khớp chủ đề chính xác
  if (TOPIC_IMAGES[t]) return pickRandom(TOPIC_IMAGES[t]) + suffix;
  // 2. Khớp từ khóa trong chủ đề
  for (const key of Object.keys(TOPIC_IMAGES)) {
    if (t.includes(key) || key.includes(t)) return pickRandom(TOPIC_IMAGES[key]) + suffix;
  }
  // 3. Theo cảm xúc
  if (mood && MOOD_IMAGES[mood]) return MOOD_IMAGES[mood] + suffix;
  // 4. Theo tông màu
  return (COLOR_IMAGES[color] || COLOR_IMAGES.warm) + suffix;
}

function copyPoem() {
  const text = document.getElementById("resultText")?.innerText;
  const title = document.getElementById("resultTitle")?.innerText;
  if (text) { navigator.clipboard.writeText(`${title}\n\n${text}\n\n— PoetryAI`); showToast("Đã sao chép bài thơ!"); }
}

function sharePoem() {
  const text = document.getElementById("resultText")?.innerText;
  if (navigator.share && text) {
    navigator.share({ title: "PoetryAI", text });
  } else {
    navigator.clipboard.writeText(window.location.href);
    showToast("Đã sao chép link chia sẻ!");
  }
}

function downloadPoem() {
  const text = document.getElementById("resultText")?.innerText;
  const title = document.getElementById("resultTitle")?.innerText || "bai-tho";
  if (!text) return;
  const blob = new Blob([`${title}\n\n${text}\n\n— PoetryAI`], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bai-tho-poetryai.txt";
  a.click();
}

function saveToGallery() {
  showToast("Đã lưu vào bộ sưu tập của bạn! 💾");
}
