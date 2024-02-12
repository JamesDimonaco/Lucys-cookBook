"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FullRecipeTypeFromPrisma } from "@/types/recipe";
import parse from "html-react-parser";
import Image from "next/image";
import {
  BookOpenIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  AwardIcon,
} from "lucide-react";

export function Recipe({ data }: { data: FullRecipeTypeFromPrisma }) {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link
          className="lg:hidden flex items-center gap-2 text-xl font-semibold"
          href="#"
        >
          <BookOpenIcon className="h-6 w-6" />
          <span className="">Recipes</span>
        </Link>
        <Button
          className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
          size="icon"
          variant="ghost"
        >
          <Image
            alt="Avatar"
            className="rounded-full"
            height="32"
            src="/placeholder.svg"
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="32"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </header>
      <main className="grid min-h-screen gap-4 p-4 md:gap-8 md:p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {data.title}
            </h1>
            <Button className="ml-auto" size="sm">
              Get Started
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <UserIcon className="w-4 h-4" />
                <span className="sr-only">Author</span>
                <span className="">coming soon </span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span className="sr-only">Last updated</span>
                <time dateTime="01-03-2024">
                  {data.updatedAt.toISOString().split("T")[0]}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span className="sr-only">Total time</span>
                <time dateTime="PT30M">{data.duration}m</time>
              </div>
              {data.makes && (
                <div className="flex items-center gap-1">
                  <UsersIcon className="w-4 h-4" />
                  <span className="sr-only">Serves</span>
                  <time dateTime="4">{data.makes}</time>
                </div>
              )}
              <div className="flex items-center gap-1">
                <AwardIcon className="w-4 h-4" />
                <span className="sr-only">Difficulty</span>
                <time dateTime="easy">{data.difficulty}</time>
              </div>
            </div>
          </div>
          <div className="prose max-w-none">
            <h2>Introduction</h2>
            <p>
              Chocolate chip cookies are a classic treat loved by both kids and
              adults. The combination of buttery dough and sweet chocolate chips
              is simply irresistible. In this recipe, I&apos;ll show you how to
              make the perfect chocolate chip cookies that are golden brown on
              the outside, soft and chewy on the inside.
            </p>
          </div>
          <div className="border-t" />
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Ingredients</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Here&apos;s what you&apos;ll need
              </p>
            </div>
            <ul className="grid gap-2  list-inside">
              {data.ingredientSections.map((ingredientSections) => (
                <li key={ingredientSections.id}>
                  <div>{ingredientSections.title}</div>
                  <ul>
                    {ingredientSections.ingredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        <Checkbox defaultChecked id={ingredient.id}>
                          {ingredient.name}
                        </Checkbox>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Instructions</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Follow these steps to make the {data.title}:
              </p>
            </div>
            <div>{parse(data.content)}</div>
            {/* <ol className="prose list-decimal list-inside">
              <li>
                Preheat the oven to 375°F (190°C). Line a baking sheet with
                parchment paper or silicone mat.
                <Button size="sm" variant="outline">
                  More Info
                </Button>
              </li>
              <li>
                In a large bowl, cream together the butter, granulated sugar,
                and brown sugar until light and fluffy.
                <Button size="sm" variant="outline">
                  More Info
                </Button>
              </li>
              <li>
                Add the vanilla extract and eggs to the butter mixture and beat
                until well combined.
                <Button size="sm" variant="outline">
                  More Info
                </Button>
              </li>
              <li>
                In a separate bowl, whisk together the flour, baking soda, and
                salt.
                <Button size="sm" variant="outline">
                  More Info
                </Button>
              </li>
              <li>
                Gradually add the dry ingredients to the wet ingredients, mixing
                until just combined.
                <Button size="sm" variant="outline">
                  More Info
                </Button>
              </li>
              <li>
                Fold in the chocolate chips until evenly distributed in the
                dough.
                <Button size="sm" variant="outline">
                  More Info
                </Button>
              </li>
              <li>
                Drop rounded tablespoons of cookie dough onto the prepared
                baking sheet, spacing the cookies about 2 inches apart.
                <Button size="sm" variant="outline">
                  More Info
                </Button>
              </li>
              <li>
                Bake the cookies in the preheated oven for 8 to 10 minutes, or
                until the edges are golden brown and the tops are set.
                <Button size="sm" variant="outline">
                  More Info
                </Button>
              </li>
              <li>
                Remove the cookies from the oven and let them cool on the baking
                sheet for 5 minutes before transferring to a wire rack to cool
                completely.
                <Button size="sm" variant="outline">
                  More Info
                </Button>
              </li>
            </ol> */}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Notes</h2>
            </div>
            <span className="prose">{data.notes}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button className="h-10" variant="outline">
              Edit Recipe
            </Button>
            <Button className="h-10">Save to Recipe Box</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
