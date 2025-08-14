import Link from "next/link";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

export default function Post({
  title = "No title",
  subtitle = "",
  slug = "",
  authorName = "Unknown",
  authorImage = "/default-avatar.png",
  date = "",
  coverImage = "/default-image.jpg",
}) {
  const shortSubtitle =
    typeof subtitle === "string" && subtitle.length > 170
      ? subtitle.slice(0, 170) + "..."
      : subtitle || "";

  return (
    <Card elevation={3}>
      <Link href={`/blog/${slug}`} passHref legacyBehavior>
        <CardActionArea component="a">
          <CardMedia
            component="img"
            height="200"
            image={coverImage || "/default-image.jpg"}
            alt={title}
            style={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {shortSubtitle}
            </Typography>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={authorImage || "/default-avatar.png"}
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
