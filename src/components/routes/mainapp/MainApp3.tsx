import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  rem,
  Modal,
  Flex,
  Grid,
  Box,
  Switch,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
import { useState } from "react";
import { updateAppSettings } from "../../../services/auth.service";
import { appSettingsType } from "../../../types";

const mockdata = [
  { title: "Facebook", icon: IconBrandFacebook, color: "blue" },
  { title: "Gmail", icon: IconBrandGmail, color: "red" },
  { title: "Insatagram", icon: IconBrandInstagram, color: "pink" },
  { title: "Youtube", icon: IconBrandYoutube, color: "red" },
  { title: "Whatsapp", icon: IconBrandWhatsapp, color: "green" },
  { title: "Spotify", icon: IconBrandSpotify, color: "green" },
  { title: "Linkden", icon: IconBrandLinkedin, color: "blue" },
  { title: "Twitter", icon: IconBrandTwitter, color: "blue" },
  { title: "Skype", icon: IconBrandSkype, color: "blue" },
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

function MainApp3() {
  const { classes, theme } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [app, setApp] = useState({
    title: "Facebook",
    icon: IconBrandFacebook,
    color: "blue",
  });
  const [noti, setNoti] = useState(false);
  const [inbox, setInbox] = useState(false);
  const [publish, setPublish] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(false);

  const openSesemi = (item: any) => {
    console.log(item.title);
    setApp(item);
    open();
  };

  const saveAppSettings = () => {
    const item: appSettingsType = {
      title: "",
      notifications: false,
      inbox: false,
      publish: false,
      following: false,
      followers: false,
    };
    item.title = app.title;
    item.notifications = noti;
    item.inbox = inbox;
    item.publish = publish;
    item.following = following;
    item.followers = followers;
    updateAppSettings(item)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const items = mockdata.map((item) => (
    <>
      <UnstyledButton
        className={classes.item}
        onClick={() => {
          openSesemi(item);
        }}
      >
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    </>
  ));

  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Group position="apart">
          <Text className={classes.title}>Services</Text>
          <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
            + 34 other services
          </Anchor>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
      <Modal opened={opened} onClose={close}>
        <Card>
          <Grid mb="50px" justify="center" mr="35px">
            <app.icon color={theme.colors[app.color][6]} size="2rem" />
            <Text ml="md" fz="lg">
              {app.title} settings{" "}
            </Text>
          </Grid>
          <Box h="300px">
            <Flex justify="space-around" mb="xl">
              <Text w="150px"> Show notifications </Text>
              <Switch
                checked={noti}
                onChange={(event) => setNoti(event.currentTarget.checked)}
              />
            </Flex>
            <Flex justify="space-around" mb="xl">
              <Text w="150px"> Connect to inbox </Text>
              <Switch
                checked={inbox}
                onChange={(event) => setInbox(event.currentTarget.checked)}
              />
            </Flex>
            <Flex justify="space-around" mb="xl">
              <Text w="150px"> Publish content </Text>
              <Switch
                checked={publish}
                onChange={(event) => setPublish(event.currentTarget.checked)}
              />
            </Flex>
            <Flex justify="space-around" mb="xl">
              <Text w="150px"> Top 5 following </Text>
              <Switch
                checked={following}
                onChange={(event) => setFollowing(event.currentTarget.checked)}
              />
            </Flex>
            <Flex justify="space-around" mb="xl">
              <Text w="150px"> Top 5 followers </Text>
              <Switch
                checked={followers}
                onChange={(event) => setFollowers(event.currentTarget.checked)}
              />
            </Flex>
            <Grid justify="center" mt="lg">
              <Button onClick={saveAppSettings}> Save </Button>
            </Grid>
          </Box>
        </Card>
      </Modal>
    </>
  );
}

export default MainApp3;
