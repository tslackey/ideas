(function () {
  const feed = document.getElementById("ideas");
  if (!feed || !Array.isArray(window.IDEAS)) return;

  const ideas = window.IDEAS.slice().sort(function (a, b) {
    const byDate = String(b.date).localeCompare(String(a.date));
    return byDate !== 0 ? byDate : 0;
  });

  feed.replaceChildren();

  if (ideas.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Nothing here yet. Add a folder under ideas/ and an entry in js/catalog.js.";
    feed.appendChild(empty);
    return;
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  ideas.forEach(function (idea) {
    const article = document.createElement("article");
    article.className = "idea";

    const meta = document.createElement("p");
    meta.className = "idea-meta";

    const time = document.createElement("time");
    time.dateTime = idea.date;
    const parsed = new Date(idea.date + "T00:00:00");
    time.textContent = Number.isNaN(parsed.getTime())
      ? idea.date
      : formatter.format(parsed);

    meta.appendChild(time);

    if (idea.tag) {
      const tag = document.createElement("span");
      tag.className = "idea-tag";
      tag.textContent = idea.tag;
      meta.appendChild(tag);
    }

    const title = document.createElement("h2");
    title.className = "idea-title";

    const link = document.createElement("a");
    link.href = "ideas/" + encodeURIComponent(idea.slug) + "/";
    link.textContent = idea.title;
    title.appendChild(link);

    const blurb = document.createElement("p");
    blurb.className = "idea-blurb";
    blurb.textContent = idea.blurb;

    const more = document.createElement("p");
    more.className = "idea-more";
    const moreLink = document.createElement("a");
    moreLink.href = link.href;
    moreLink.textContent = "Open the toy";
    more.appendChild(moreLink);

    article.append(meta, title, blurb, more);
    feed.appendChild(article);
  });
})();
