import { useState, useContext } from "react";
import {
  createStyles,
  Header,
  Container,
  Anchor,
  Group,
  Burger,
  rem,
  Text,
  Button,
  UnstyledButton,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";
import { AuthContextProvider } from "../context/AuthContext";
import authService from "../services/auth.service";
import AuthContext from "../context/AuthContext";
import logo from "../images/logo2.png";

const HEADER_HEIGHT = rem(84);

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: 0,
  },

  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  links: {
    paddingTop: theme.spacing.lg,
    height: HEADER_HEIGHT,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  mainLinks: {
    marginRight: -theme.spacing.sm,
  },

  mainLink: {
    textTransform: "uppercase",
    fontSize: rem(13),
    color: theme.white,
    padding: `${rem(7)} ${theme.spacing.sm}`,
    fontWeight: 700,
    borderBottom: `${rem(2)} solid transparent`,
    transition: "border-color 100ms ease, opacity 100ms ease",
    opacity: 0.9,
    borderTopRightRadius: theme.radius.sm,
    borderTopLeftRadius: theme.radius.sm,

    "&:hover": {
      opacity: 1,
      textDecoration: "none",
    },
  },

  secondaryLink: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.xs,
    textTransform: "uppercase",
    transition: "color 100ms ease",

    "&:hover": {
      color: theme.white,
      textDecoration: "none",
    },
  },

  mainLinkActive: {
    color: theme.white,
    opacity: 1,
    borderBottomColor:
      theme.colorScheme === "dark"
        ? theme.white
        : theme.colors[theme.primaryColor][5],
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background!,
      0.1
    ),
  },
}));

interface LinkProps {
  label: string;
  link: string;
}

interface DoubleHeaderProps {
  mainLinks: LinkProps[];
  userLinks: LinkProps[];
}

export const mainlinks: LinkProps[] = [
  { label: "Home", link: "/home" },
  { label: "About", link: "/about" },
  { label: "App", link: "/mainapp" },
  { label: "Shop", link: "/shop" },
];
export const userLinks: LinkProps[] = [
  { label: "Home", link: "/home" },
  { label: "About", link: "/about" },
  { label: "App", link: "/mainapp" },
  { label: "Shop", link: "/shop" },
];

export function MainHeader({ mainLinks, userLinks }: DoubleHeaderProps) {
  const { isLoggedIn, logout, admin } = useContext(AuthContext);
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(0);
  const nav = useNavigate();

  const signOut = () => {
    localStorage.removeItem("admin");
    authService.logout();
    logout();
    nav("/register");
  };

  const mainItems = mainLinks.map((item, index) => (
    <Anchor<"a">
      sx={!admin && item.label === "App" ? { display: "none" } : {}}
      key={item.label}
      className={cx(classes.mainLink, {
        [classes.mainLinkActive]: index === active,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
        nav(item.link);
      }}
    >
      {item.label}
    </Anchor>
  ));

  const secondaryItems = userLinks.map((item) => (
    <Anchor<"a">
      sx={!admin && item.label === "App" ? { display: "none" } : {}}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        nav(item.link);
      }}
      className={classes.secondaryLink}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={15} className={classes.header}>
      <Container className={classes.inner}>
        <div style={{ color: "#fff" }}>
          <NavLink to={"/"}>
            <Flex>
              <img sizes="5px" src={logo} alt="Logo" />
              <Text ml="md" color="#fff" fz="24px" variant="outline">
                GoToApp
              </Text>
            </Flex>
          </NavLink>
        </div>

        <div className={classes.links}>
          <Group position="right">{secondaryItems}</Group>
          <Group spacing={0} position="right" className={classes.mainLinks}>
            <Flex>{mainItems}</Flex>
          </Group>
        </div>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          color="#fff"
        />
        <UnstyledButton onClick={signOut}>
          <IconLogout />
        </UnstyledButton>
      </Container>
    </Header>
  );
}
