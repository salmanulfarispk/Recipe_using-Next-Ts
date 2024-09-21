"use client";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  Input,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import { useState } from "react";


interface Recipe {
  label: string;
  image: string;
  healthLabels: string[];
}

interface Hit {
  recipe: Recipe;
}

interface ApiResponse {
  hits: Hit[];
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [datas, setDatas] = useState<Hit[]>([]);

  const submitValue = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${inputValue}&app_id=${APP_ID}&app_key=${API_KEY}`
    );
    const data: ApiResponse = await response.json(); 
    if (data) {
      setDatas(data.hits); 
    }
  };

  return (
    <main className="mb-10">
      <Heading
        size="xl"
        className="flex flex-col justify-center items-center p-10"
      >
        Find your recipe
      </Heading>
      <div className="flex items-center justify-center gap-x-2 px-3 md:px-0">
        <Input
          placeholder="Mango, Apple, etc..."
          width={`60%`}
          className="p-8"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          colorScheme="teal"
          size="xl"
          padding={6}
          className="pl-4 pe-4"
          onClick={submitValue}
        >
          Search For Recipe
        </Button>
      </div>

      <div className="mt-5 px-5 grid grid-cols-1 md:grid-cols-4 gap-5">
        {datas.length > 0 &&
          datas.map((items, index) => (
            <Card maxW="sm" key={index}>
              <CardBody>
                <Image
                  src={items.recipe.image}
                  alt="recipe"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{items.recipe.label}</Heading>
                  <UnorderedList>
                    {items.recipe.healthLabels.map((text) => (
                      <ListItem key={text}>{text}</ListItem>
                    ))}
                  </UnorderedList>
                </Stack>
              </CardBody>
              <Divider />
            </Card>
          ))}
      </div>
    </main>
  );
}
