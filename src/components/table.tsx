import Image from "next/image";
import { Recipe } from "@prisma/client";
import classNames from "classnames";
import Link from "next/link";

export default async function Table({ recipes }: { recipes: Recipe[] }) {
  return (
    <table className="px-4 sm:px-6 lg:px-8">
      {/* your other elements... */}
      <tbody>
        {recipes.map((recipe, recipeIdx) => (
          <tr key={recipe.id}>
            <td
              className={classNames(
                recipeIdx !== recipes.length - 1
                  ? "border-b border-gray-200"
                  : "",
                "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
              )}
            >
              {" "}
              <Link href={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </td>
            {/* Add an Image from imageUrl if it exists */}
            {recipe.imageUrl && (
              <td
                className={classNames(
                  recipeIdx !== recipes.length - 1
                    ? "border-b border-gray-200"
                    : "",
                  "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                )}
              >
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  width={50}
                  height={50}
                />
              </td>
            )}
            <td
              className={classNames(
                recipeIdx !== recipes.length - 1
                  ? "border-b border-gray-200"
                  : "",
                "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
              )}
            >
              {recipe.content}
            </td>
            <td
              className={classNames(
                recipeIdx !== recipes.length - 1
                  ? "border-b border-gray-200"
                  : "",
                "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
              )}
            >
              {
                // @ts-ignore
                recipe.author.name
              }
            </td>
          </tr>
        ))}
      </tbody>
      {/* your other elements... */}
    </table>
  );
}
