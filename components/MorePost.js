import Link from "next/link";
import { Card, CardContent, CardMedia, CardActionArea } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export default function MorePost({
  title,
  subtitle,
  slug,
  authorName,
  authorImage,
  date,
  coverImage,
}) {
  const shortSubtitle = subtitle?.length > 170 ? subtitle.slice(0, 170) + "..." : subtitle || "";

  return (
    <Card elevation={3}>
      <Link href={`/blog/${slug}`} passHref>
        <CardActionArea component="a">
          {coverImage && (
            <CardMedia
              component="img"
              height="200"
              image={coverImage}
              alt={title}
              style={{ objectFit: "cover" }}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {shortSubtitle}
            </Typography>
            <div style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}>
              <img
                src={authorImage}
                alt={authorName}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: 10,
                }}
              />
              <Typography variant="caption" color="textSecondary">
                {authorName} &nbsp;&bull;&nbsp; {date}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
