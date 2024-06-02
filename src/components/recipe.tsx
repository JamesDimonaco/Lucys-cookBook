"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { IIngredient, IIngredientSection, IRecipe } from "@/types/recipeTypes";
import { deleteRecipe } from "@/actions";

export function Recipe({ data }: { data: IRecipe }) {
  return (
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
                {data.updatedAt && data.updatedAt.toISOString().split("T")[0]}
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
          <p>{data.description}</p>
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
            {data.ingredientSections.map(
              (ingredientSections: IIngredientSection) => (
                <li key={ingredientSections.id}>
                  <div>{ingredientSections.title}</div>
                  <ul>
                    {ingredientSections.ingredients.map(
                      (ingredient: IIngredient) => (
                        <li key={ingredient.id}>
                          <Checkbox defaultChecked id={ingredient.id}>
                            {ingredient.name}
                          </Checkbox>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Instructions</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Follow these steps to make the {data.title}:
            </p>
          </div>
          <div>{parse(data.content ?? "")}</div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Notes</h2>
          </div>
          <span className="prose">{data.notes}</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/recipe/${data.id}/edit`}>
            <Button className="h-10" variant="outline">
              Edit Recipe
            </Button>
          </Link>
          <Button
            onClick={() => deleteRecipe(data.id)}
            className="h-10"
            variant="destructive"
          >
            Delete Recipe
          </Button>
          <Button className="h-10">Save to Recipe Box</Button>
        </div>
      </div>
    </main>
  );
}
