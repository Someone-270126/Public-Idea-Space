(() => {
  const cfg = window.IDEA_SPACE_CONFIG || {};
  const configured = cfg.SUPABASE_URL && cfg.SUPABASE_PUBLISHABLE_KEY && !cfg.SUPABASE_URL.includes("PASTE_") && !cfg.SUPABASE_PUBLISHABLE_KEY.includes("PASTE_");
  const form = document.getElementById("idea-form"), status = document.getElementById("form-status");
  const list = document.getElementById("idea-list"), wallStatus = document.getElementById("wall-status");
  const bodyInput = document.getElementById("body"), count = document.getElementById("char-count");
  let client = null, selectedCategory = "Semua", allIdeas = [];
  bodyInput.addEventListener("input", () => count.textContent = `${bodyInput.value.length} / 1500`);
  const safe = v => String(v ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const showStatus = (msg, type="") => {status.textContent=msg;status.className=`form-status ${type}`;};
  function renderIdeas() {
    const ideas = selectedCategory === "Semua" ? allIdeas : allIdeas.filter(i=>i.category===selectedCategory);
    if (!ideas.length) {
      list.innerHTML = `<article class="empty-state"><span class="empty-symbol">✳</span><h3>${selectedCategory==="Semua"?"Ruang ini menunggu ide pertamamu.":"Belum ada ide di kategori ini."}</h3><p>Bagikan gagasanmu dan bantu memulai percakapan.</p><a href="#share">Bagikan ide ↗</a></article>`;
      return;
    }
    list.innerHTML = ideas.map(i => {
      const date = i.created_at ? new Date(i.created_at).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}) : "";
      return `<article class="idea-card"><div class="idea-category">${safe(i.category)}</div><h3>${safe(i.title)}</h3><p class="idea-body">${safe(i.body)}</p><div class="idea-author"><span>Oleh ${safe(i.author_name||"Anonim")}</span><span>${safe(date)}</span></div></article>`;
    }).join("");
  }
  document.getElementById("filters").addEventListener("click",e=>{
    const b=e.target.closest("[data-category]");if(!b)return;
    selectedCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderIdeas();
  });
  async function loadIdeas() {
    if(!configured||!client){wallStatus.textContent="Hubungkan Supabase untuk memuat ide yang telah disetujui.";return;}
    wallStatus.textContent="Memuat ide publik…";
    const {data,error}=await client.from("ideas").select("id,category,title,body,author_name,created_at").eq("status","approved").order("created_at",{ascending:false}).limit(100);
    if(error){wallStatus.textContent="Ide belum dapat dimuat. Periksa konfigurasi dan kebijakan keamanan Supabase.";console.error(error);return;}
    allIdeas=data||[];renderIdeas();wallStatus.textContent=`${allIdeas.length} ide diterbitkan · Hanya kiriman yang disetujui yang tampil`;
  }
  form.addEventListener("submit",async e=>{
    e.preventDefault();if(document.getElementById("website").value)return;
    if(!configured||!client){showStatus("Website belum tersambung ke Supabase. Ikuti SETUP.md untuk menghubungkannya.","error");return;}
    const title=document.getElementById("title").value.trim(), body=bodyInput.value.trim(), author=document.getElementById("author").value.trim();
    if(title.length<4||body.length<15){showStatus("Judul minimal 4 karakter dan cerita ide minimal 15 karakter.","error");return;}
    const button=form.querySelector("button[type=submit]");button.disabled=true;showStatus("Mengirim ide…");
    const payload={category:document.getElementById("category").value,title,body,author_name:author||"Anonim"};
    const {error}=await client.from("ideas").insert(payload);button.disabled=false;
    if(error){console.error(error);showStatus("Belum berhasil mengirim. Coba lagi beberapa saat lagi.","error");return;}
    form.reset();count.textContent="0 / 1500";
    showStatus("Terima kasih! Ide kamu masuk antrean peninjauan. Jika disetujui, ide akan muncul di Idea Wall.","success");
  });
  if(configured&&window.supabase?.createClient){client=window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_PUBLISHABLE_KEY);loadIdeas();}
  else wallStatus.textContent="Mode pratinjau: isi konfigurasi Supabase untuk mengaktifkan kiriman dan Idea Wall.";
})();
