import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  rem,
  Button,
  Flex,
} from "@mantine/core";
import {
  IconBrandGmail,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandWhatsapp,
  IconBrandSpotify,
  IconBrandSkype,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { addApps, getChosenApps } from "../../services/auth.service";

const mockdata = [
  { title: "Facebook", icon: IconBrandFacebook, color: "blue", chosen: false },
  { title: "Gmail", icon: IconBrandGmail, color: "red", chosen: false },
  {
    title: "Insatagram",
    icon: IconBrandInstagram,
    color: "pink",
    chosen: false,
  },
  { title: "Youtube", icon: IconBrandYoutube, color: "red", chosen: false },
  { title: "Whatsapp", icon: IconBrandWhatsapp, color: "green", chosen: false },
  { title: "Spotify", icon: IconBrandSpotify, color: "green", chosen: false },
  { title: "Linkden", icon: IconBrandLinkedin, color: "blue", chosen: false },
  { title: "Twitter", icon: IconBrandTwitter, color: "blue", chosen: false },
  { title: "Skype", icon: IconBrandSkype, color: "blue", chosen: false },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(90),
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
}));

function Shop() {
  const { classes, theme } = useStyles();
  const [chosenApps, setChosenApps] = useState<string[]>([]);
  const [id, setId] = useState("");

  useEffect(() => {
    getChosenApps().then((res) => {
      console.log(res);
      setId(res.data[0]._id ?? "");
      console.log(id);
    });
  }, [id]);

  const addToCart = (name: string) => {
    const chosenIndex = chosenApps.findIndex((c: any) => c === name);
    console.log(chosenIndex);
    if (chosenIndex === -1) {
      chosenApps.push(name);
      setChosenApps(chosenApps);
      console.log(chosenApps);
    } else {
      chosenApps.splice(chosenIndex, 1);
      setChosenApps(chosenApps);
      console.log(chosenApps);
    }
  };
  const checkout = () => {
    addApps(chosenApps, id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  const items = mockdata.map((item) => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      onClick={() => {
        addToCart(item.title);
      }}
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="sm" mt={7}>
        {item.title}
      </Text>

      {!chosenApps.includes(item.title) && (
        <Text size="xs" mt={3}>
          {" "}
          Add to cart{" "}
        </Text>
      )}
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Text ta="center" fz="30px">
        Choose apps to connet from GoToApp
      </Text>
      <Text ta="center" fz="20px">
        {" "}
        Only five dollars for one app per month
      </Text>
      <Group position="apart">
        <Text className={classes.title}>Services</Text>
        <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
          + 21 other services
        </Anchor>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
      <Flex justify="center" mt="xl">
        <Button ta="center" onClick={checkout}>
          {" "}
          Checkout{" "}
        </Button>
      </Flex>
    </Card>
  );
}

export default Shop;
