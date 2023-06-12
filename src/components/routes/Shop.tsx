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
  Select,
} from "@mantine/core";
import { IconApiApp } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { addApps, getChosenApps } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { appList, mockdata } from "./dataForApp";

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
  const [value, setValue] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getChosenApps().then((res) => {
      setChosenApps(res.data);
    });
  }, []);

  const addAppToShop = () => {
    const added = {
      title: value ?? "",
      icon: IconApiApp,
      color: "blue",
    };
    mockdata.push(added);
    navigate("/shop");
  };

  const addToCart = (name: string) => {
    const chosenIndex = chosenApps.findIndex((c: any) => c === name);

    if (chosenIndex === -1) {
      chosenApps.push(name);
      setChosenApps(chosenApps);

      navigate("/shop");
    } else {
      chosenApps.splice(chosenIndex, 1);
      setChosenApps(chosenApps);

      navigate("/shop");
    }
  };
  const checkout = () => {
    addApps(chosenApps)
      .then((res) => {
        Swal.fire("Thanks", "For subscribing to GoToApp", "success");
        navigate("/shop");
      })
      .catch((e) => console.log(e));
  };

  const items = mockdata.map((item) => (
    <UnstyledButton
      sx={chosenApps.includes(item.title) ? { background: "#f1f1f1" } : {}}
      key={item.title}
      className={classes.item}
      onClick={() => {
        addToCart(item.title);
      }}
      p={6}
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="sm" m={7}>
        {item.title}
      </Text>

      {!chosenApps.includes(item.title) && (
        <Button variant="light" size="xs" m={3}>
          Subscribe
        </Button>
      )}
      {chosenApps.includes(item.title) && (
        <Button variant="light" size="xs" m={3}>
          Unsubscribe
        </Button>
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
          + 34 other services
        </Anchor>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
      <Flex justify="center" mt="xl">
        <Select
          searchable
          label="Search for an app to create and add"
          placeholder="Tyoe to search"
          data={appList}
          value={value}
          onChange={setValue}
        />
        <Button ml={10} mt={25} onClick={addAppToShop}>
          {" "}
          Add{" "}
        </Button>
      </Flex>

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
