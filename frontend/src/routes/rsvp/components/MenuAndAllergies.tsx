import { type Control, Controller, type UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Inputs } from "../types"

type Props = {
  nightBeforeAccess: boolean
  control: Control<Inputs>
  register: UseFormRegister<Inputs>
  allergiesValue: string | null
}

export const MenuAndAllergies = ({
  nightBeforeAccess,
  control,
  register,
  allergiesValue,
}: Props) => {
  return (
    <div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 py-15 px-10 bg-cover bg-center bg-no-repeat ${
          nightBeforeAccess
            ? "bg-[url(@/assets/Menu-beige.jpg)]"
            : "bg-[url(@/assets/Menu-Green.jpg)]"
        }`}
      >
        {/* Menu Card */}
        <div className="flex justify-center">
          <div
            className="bg-[url(@/assets/Paper-texture.jpeg)] bg-cover bg-center
                 text-forest-green flex flex-col gap-6 shadow-md
                 w-[450px] p-8 font-metropolis drop-shadow-md/50"
          >
            {/* Header */}
            <div className="text-center">
              <p className="text-5xl font-mattedly leading-tight">The Menu</p>
            </div>

            {/* To Begin */}
            <section className="flex flex-col gap-2">
              <h2 className="text-4xl font-mattedly mb-1">To Begin</h2>

              <Controller
                name="starter"
                control={control}
                rules={{ required: "Confirm starter option from menu" }}
                render={({ field }) => (
                  <RadioGroup
                    className="flex flex-col gap-2 font-evafiya"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <Label
                      className="flex items-center gap-3 leading-snug cursor-pointer"
                      htmlFor="starter-tomato"
                    >
                      <RadioGroupItem
                        id="starter-tomato"
                        value="tomato"
                        className="mt-1"
                      />
                      <span className="text-xl">
                        Isle of Wight heritage tomatoes, vegan mozzarella, leaf,
                        basil oil, ciabatta bread
                      </span>
                    </Label>

                    <p className="text-center text-xl italic my-1 opacity-70">
                      OR
                    </p>

                    <Label
                      className="flex items-center gap-3  leading-snug cursor-pointer"
                      htmlFor="starter-antipasti"
                    >
                      <RadioGroupItem
                        id="starter-antipasti"
                        value="antipasti"
                        className="mt-1"
                      />
                      <span className="text-xl">
                        Vegetable antipasti board, chargrilled pepper,
                        courgette, olives, balsamic onions, sourdough, vegan
                        pesto
                      </span>
                    </Label>
                  </RadioGroup>
                )}
              />
            </section>

            {/* The Main Event */}
            <section className="flex flex-col gap-2 mt-3">
              <h2 className="text-4xl font-mattedly mb-1">The Main Event</h2>

              <Controller
                name="main"
                control={control}
                rules={{ required: "Confirm main option from menu" }}
                render={({ field }) => (
                  <RadioGroup
                    className="flex flex-col gap-2 font-evafiya"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <Label
                      className="flex items-center gap-3 leading-snug cursor-pointer"
                      htmlFor="main-croute"
                    >
                      <RadioGroupItem
                        id="main-croute"
                        value="croute"
                        className="mt-1"
                      />
                      <span className="text-xl">
                        Butternut squash, spinach & mushroom en croûte, roast
                        tomato sauce, tenderstem broccoli, fondant potato
                      </span>
                    </Label>

                    <p className="text-center text-xl italic my-1 opacity-70">
                      OR
                    </p>

                    <Label
                      className="flex items-center gap-3 leading-snug cursor-pointer"
                      htmlFor="main-risotto"
                    >
                      <RadioGroupItem
                        id="main-risotto"
                        value="risotto"
                        className="mt-1"
                      />
                      <span className="text-xl">
                        Spelt leek & pea risotto, oyster mushroom, vegan
                        parmesan
                      </span>
                    </Label>
                  </RadioGroup>
                )}
              />
            </section>

            {/* Something Sweet */}
            <section className="flex flex-col gap-2 mt-3">
              <h2 className="text-4xl font-mattedly mb-1">Something Sweet</h2>

              <Controller
                name="dessert"
                control={control}
                rules={{ required: "Confirm desert option from menu" }}
                render={({ field }) => (
                  <RadioGroup
                    className="flex flex-col gap-2 font-evafiya"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <Label
                      className="flex items-center gap-3 leading-snug cursor-pointer"
                      htmlFor="dessert-tart"
                    >
                      <RadioGroupItem
                        id="dessert-tart"
                        value="tart"
                        className="mt-1"
                      />
                      <span className="text-xl">
                        Chocolate tart, passion fruit sorbet, chocolate sauce,
                        passion fruit crumb
                      </span>
                    </Label>

                    <p className="text-center text-xl italic my-1 opacity-70">
                      OR
                    </p>

                    <Label
                      className="flex items-center gap-3 text-sm leading-snug cursor-pointer"
                      htmlFor="dessert-jelly"
                    >
                      <RadioGroupItem
                        id="dessert-jelly"
                        value="jelly"
                        className="mt-1"
                      />
                      <span className="text-xl">
                        Elderflower jelly, summer fruits, vegan crème fraîche
                      </span>
                    </Label>
                  </RadioGroup>
                )}
              />
            </section>
          </div>
        </div>

        {/* Allergies & Intolerances Section */}
        <div className="flex flex-col justify-center items-center mt-10 sm:mt-0">
          <div
            className={`${nightBeforeAccess ? "bg-forest-green text-beige" : "bg-beige text-forest-green"} flex flex-col items-center gap-5
                 py-8 px-6 max-w-[400px] font-metropolis shadow-md text-center`}
          >
            {/* Header */}
            <div>
              <h2 className="text-5xl font-mattedly mb-4">
                Allergies and Intolerances
              </h2>
              <p className="max-w-[360px] mx-auto text-xl font-evafiya mb-2">
                The menu is plant-based and therefore free from dairy and eggs.
              </p>

              <p className="max-w-[360px] mx-auto text-xl font-evafiya">
                {" "}
                If you have any other food allergies or intolerances, please let
                us know below.
              </p>
            </div>

            {/* Allergies Radios */}
            <Controller
              name="allergies"
              control={control}
              rules={{ required: "Confirm If you have any allergies" }}
              render={({ field }) => (
                <RadioGroup
                  className="flex flex-row gap-8 justify-center mt-2 font-evafiya"
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <Label
                    className="flex flex-col items-center gap-1 text-lg cursor-pointer"
                    htmlFor="allergy-none"
                  >
                    <RadioGroupItem id="allergy-none" value="none" />
                    <span>None / Not applicable</span>
                  </Label>

                  <Label
                    className="flex flex-col items-center gap-1 text-lg cursor-pointer"
                    htmlFor="allergy-yes"
                  >
                    <RadioGroupItem id="allergy-yes" value="yes" />
                    <span>Yes, I have allergies</span>
                  </Label>
                </RadioGroup>
              )}
            />

            {/* Allergy Notes (conditional) */}
            {allergiesValue === "yes" && (
              <div className="flex flex-col items-start w-full mt-3 text-left">
                <Label
                  htmlFor="allergyNotes"
                  className="mb-1 text-lg font-evafiya"
                >
                  Please specify:
                </Label>
                <Input
                  id="allergyNotes"
                  placeholder="Type here"
                  {...register("allergyNotes", {
                    required:
                      allergiesValue === "yes" &&
                      "Confirm your allergies/ intolerances",
                  })}
                  className="bg-white text-forest-green placeholder:text-forest-green/50 w-full h-[36px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
