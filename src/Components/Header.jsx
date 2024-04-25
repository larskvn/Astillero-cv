import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

function Header() {
  return (
    <Navbar className="bg-COLOR-CV-F7B801 px-0">
      <p className="font-bold text-inherit">Astillero</p>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link className="text-COLOR-CV-292F36 text-1xl">Contacto</Link>
        </NavbarItem>
        <NavbarItem>
          <Button className="bg-COLOR-CV-292F36 shadow-lg text-COLOR-CV-F2F4F3 w-32 text-1xl">
            Empezar
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
