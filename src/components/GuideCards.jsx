import { Link } from "react-router-dom";
import { guides } from "../core/content/guides";
import { theme } from "../styles/wayliTheme";

export default function GuideCards({
  category = "",
  title = "Helpful guides",
  limit = 3,
  excludeUrl = ""
}) {
  const filtered = guides.filter((guide) => {
    const categoryMatch = category
      ? guide.category === category
      : true;

    const notExcluded = excludeUrl
      ? guide.url !== excludeUrl
      : true;

    return categoryMatch && notExcluded;
  });

  const items = filtered.slice(0, limit);

  if (!items.length) {
    return null;
  }

  const wrap = {
    background: theme.colours.white,
    borderRadius: theme.radius.card,
    padding: 24,
    border: `1px solid ${theme.colours.neutralBorder}`,
    boxShadow: theme.shadow.card,
    marginTop: 18
  };

  const grid = {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16
  };

  const card = {
    display: "block",
    textDecoration: "none",
    background: theme.colours.pageBg,
    border: `1px solid ${theme.colours.neutralBorder}`,
    borderRadius: theme.radius.inner,
    padding: 18
  };

  const heading = {
    fontSize: 18,
    fontWeight: 800,
    color: theme.colours.heading,
    margin: "0 0 8px 0"
  };

  const text = {
    fontSize: 15,
    lineHeight: 1.7,
    color: theme.colours.body,
    margin: 0
  };

  return (
    <div style={wrap}>
      <h3
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: theme.colours.heading,
          margin: "0 0 16px 0"
        }}
      >
        {title}
      </h3>

      <div style={grid}>
        {items.map((guide) => (
          <Link
            key={guide.url}
            to={guide.url}
            style={card}
          >
            <h4 style={heading}>
              {guide.title}
            </h4>

            <p style={text}>
              {guide.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}