"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItem } from "../types";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FaMinus, FaPlus } from "react-icons/fa";

const dummyMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Chicken Burger",
    price: 120,
    description: "Juicy chicken patty with fresh vegetables",
    category: "Fast Food",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    isAvailable: false,
  },
  {
    id: "2",
    name: "Veg Pizza",
    price: 150,
    description: "Fresh vegetables on a crispy base",
    category: "Fast Food",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    isAvailable: false,
  },
  {
    id: "3",
    name: "Masala Dosa",
    price: 80,
    description: "Crispy dosa with spicy potato filling",
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1630409351241-e90e7f5e434d?w=500",
    isAvailable: true,
  },
  {
    id: "6",
    name: "Chicken Biryani",
    price: 180,
    description: "Fragrant rice with tender chicken pieces",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
    isAvailable: true,
  },
  {
    id: "7",
    name: "Samosa",
    price: 30,
    description: "Crispy pastry with spiced potato filling",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    isAvailable: true,
  },
  {
    id: "8",
    name: "Bonda",
    price: 25,
    description: "Fragrant rice with tender chicken pieces",
    category: "Main Course",
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA+gMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgMEAAIHAf/EAEsQAAIBAwICBgcFBQUFBgcAAAECAwAEEQUSITEGEyJBUWEUMkJxgZHRI1KhscEVU3KS4SQzYvDxBzSCk5QWQ3OD0uIlNVRVY6LC/8QAGgEAAgMBAQAAAAAAAAAAAAAAAgMBBAUABv/EACkRAAICAQQBBAIBBQAAAAAAAAABAgMRBBIhMUEFEyJRFDJhI0JxgcH/2gAMAwEAAhEDEQA/AOcxbPvr86uwSQAjeFPxreO0gI9arsVpaDhkH4VWzH7LaT+iNTbtyVB8aljCZ7DL7ia3/Z8DHslfdirUWmQqAxK/AUPxCw/o9gWM8GVSateidYQVhAHkayKztlIJf5VIY0z2JG9wFCFz9GyWnVqC0Zx76mjCd0dRQx9rtmQircUELsQokz54xXYOzjwbxgHkpPwqZUB9gfBar3c+n2HG5uNrYztAyfwqO21ixuGUW/Xvk4AxjjQ8ASuivJcltYiRtX3jhVix0mK9cQwnZcE5QNwV/LyNKd70qngaRYLdEAOO2STmtrbpZK06MGEfDiVGCGHfUZz0JlqY+Bnkt3tZzFcKYHzxWTs/61689lGPtLuH4Nn8qMaXqmk9N9PNrqMUfpiDtLyI/wASmlXpD0MvtI3y2266s84JC9pB5gc6VY5v9WBLUzxwW21XTF7CzOxHHsJWi9ItLTjtmO7hxxSgpYggn7SHtA+IqW4t1kjSVGzDNw4dzUG2x/3CvyZjf/2isiDsgO4DO1m4GoYulVqWZHs0UjvLHhSUyTKrKSd8XHH3hWzxu1u18q/ZKVWTJ4gnlSXXb5kwffsY8t0jhjftW0bDGTtJq1b9JLOQgLbRceRJzSBA/WqYyx3qOyfKoEleGTcpbqycHyNJcLHxvZHvzXk69Dc20659Hi88VZjW29ZNyk8wCCK55pWpuoELud6jKn7wot+03QCWKQ7CeX3T4VQdmsreIzGR1L8jmOqBwJMeTDFbkSAZxkfeQg/lSvBrGVySNp4YzV5NUwVyxK8wQaZD1bVV/tHI1XxfYbDAj1irefCvDOEHAZPjkUPj1aNmCnBJ+8P1q9FLbSjtZXHMitCn1emTxP4v+RilF9GrXJIOFH8wqjNczkkCBiP4hRKVtPiAJm4HyNV2urHb2ZRnzBrUjJSWUw0kUrSZcOs8MkbH21YZqVYIJpmkuZJWTbhULDA86ke4shycE/wmq013bv2M9nxCGmbmRtRUv1RPViQr5EA0LN4Af9zb+Zas3V3bqSN5J5eqapmaDP8A7DQtkpCJBCGOAyfzVbhsnclQePvryBBkHq93A8CccTVmOFzyGM0OJBqUTY6XcRKGZHweWDWyW2PW6we+pUikYYcEhefGjekdGbvUGD7Fig/eMOJ9woctEOcF2BltgccZB4ZHOj2h9GLi+2sz9TGx4b87j8KO3miabpFoxh2vcqMvNNyQfkPdzpcTpFqAlEeiQm4McoXripIBbPDjy+NDOxR/Y6MLLf0XAa1HR9P0+zbasssoIXex4AnypX1DSbkOevkY7c8FOMVatodc1G4d9euZLe2R8dSpALn4ch50xaYtkYjZrOszHO7rDlj3czxrP1HqNVbwlkN+n3SjlyOf3CCWJTIoZojhvHh/SpdMtrVLh4bmSSKMkNHcJxCeZHeKYbzowbe4KWtyJHz/AHTttPz8aAXBhglK73RoiUaN8ZXy8KfTqKrlmDKs9BbHlPJnSbozeQTm5i6mWCYb1ljbsnPPHlSsdOuAcdZED4daBTrpXSltKsPRL2FbmxLnYe4e76Vpe22gayvW2lyIHYcA3q/OjlZgqYw8PsXdNt9WtpkmtVzJGcq0cqk/nXR9C6cXSqkOq2zwy8jvTKN7iOVIx6N6ravvs3jmXuaOQUd0To5qeouqajOLSL/Ee23uFVrIyk8xfP8AAPK6Dmq6Ro2ryek2rehXBPsdpG94pfk0G8sZXtzH19rMcq8Hb2t3ZHMUS1XRX0edOoi9IhPDc7HI+VFdMvbiOFTFJ6FAozIyAcR5k0EZXwn/AFeUckm8MXk6L6vdGGSKwmEi9hmddqup7+Nb9I00m0so9AsWe4aB+uuxAud8ngW5ACmvUr0vo8sekzzy3M0e5riYneV8F8OFQdDNJsblzeCPLQRjfGR67nO3PyNXtu9rAyOIvC5EiHQbmW3F5cpHp9qvqS3Um0EeXeflQm7v9DtZpFWS6vCRx6uMRpnyJ40+dMr6OW5dIBHcyp2TJKNyr/hReQHnSxFoCmRVdojPMc8SMJ7/AApErKYPHZsUekuUd8+EwFHrdplAlg42eqzTnP5Ub06+t7zevUOhfgQlwOPwIo7a9FNLULDqYczTIWjaAlt2O4Y/Wq0XQ2P0lpbSWKW0cD0ZmGWY4Gd/AbcfShhOmx4wd+Jp5S2pojayltj/ALxt3DAW5GzPluGVz78Vr6TNZuYrmMx54oW7/MHlV686LaxFbbLS/NxG3HZJyHu8KC6R6XZaiuja5G/oVy+xCe0YWJwHQ/pU26KuSykU7tCo/qX4b0s2xwR4Hz8KKW2qYUgN9ovPzpVuDNY3k9lcH+0W7tGePrY/zmonuyy9bGcSDi2PCsyekTeGjOUpRY+Q6pCw3bwv3l8DV/T76yunETGPcx7JHL5VyuS/cDepOxuDV5BfTQSBwxx3ceBFO09FtD3Ql/odG6SOwNFHxwVAH+GqzAGUKnEeO3FLGh3kWrxsC7+kR8SA5G4eNEX0tZDlutJ8d5GPxrbqnvjkuQluWUXJ4HScSKBkH7laG6cHGF/lFDZNEiPrNcD/AMxvrVJujEBJPWz8f/yNTCQHbWlyT9pD/wAuVT+dWGguUIC275Y4H2ynjWhuwnMr8zTb0M0b0vGp3hxEM9Sh9o/ePxpCc28E2yhXHgKdHejcNgkV3fqJJ2PBG5KMeFXFvOovZ4y+0HMhYewijBx5nIAq/e3K9UWB4JtPwpN6bXM9lKtzbsqpIjQMxXIVjh1z5HbimS+K47K1KVli3s315bnUcLscQHPZQjOPHj31Rt2j0G0YQxDrHILEDhx8s86DaTqi6hvjE9wxiwHeVgMnyFXpnUA72LcBhfGvPah2TntsPV011qHHRl9dySHtODkZyTWlnqRtNUMajIUdvA4tmqMZjeNpSDLIPZAxw44FZBOxik1B12TnHY57VHh41CqiotYHuaawPymG+torqTKuuOJ4caU+mfRp765jvrAqkjcJd3AN58Ku6LqMlxp0qyOACDsz3g/61Zt/S5o54prlXi6vCSIBwI+NU6/c09jlF9FWVPPPQiWFqz3jaZdYZJZBDkAgcThXHuODVE9G7tCdkgVt5VsHkRzpp0PS7yz1c6hq1zFLFC+bNdu0yP3EjwH6UWaONoEuym2C4JWZf3T5x+f516ODbisM836m471gA9CujV3ca0i6jdEwRgv1QODKRyHuro1xpUqTGRVPHlju8q5ze9JbvTJG9Etojd28m0u5OSvcMUe0XpT0y1ZlVLS3WNl/vWhOBTMbV8l/gpJcBu+ufRbeSS/lSOJFyWek9ekd1q16sFjbdXYM4TtL2nPifD3VJfaZcarqAOsagzorYeJU2iNu4gUc0vSbPT5nXdmGTAO4cVPcaCMHN5lz/wABk/CClrDNNbnrVVLmD1dvtrVbUZf2Ef2jDuOn3aiO5VOcbey/z/OiyElRKnanh4MAfXXy/Sq2ozWhtmSYg6feAqT+7c+P+edXtqwMrlskpHOLkzwsXuQWUnKEnsyKfA1FaiZnPo8iRSudo3HO2tLw3+g3ctnHOrxc1RxujdTyOKoSa3ACfSdKQN3tbylfwORVB6byj1NXqcZwxZ0GxD0gULEZY4oYm60XRJABPeccf9Kd+i8t1DYJ+1bmKYyNtQwjcmzxJwP6Vzuz6bWVsNskWoMuCArMjYz58Ksw/wC0GC3iCR2M8jj1WZkTnz5ZH4U2FSTztKbhpY8xkdeURRMRGE2Hj2R/nhS/0h0+0lvbC5uSsVtaTCWR8cWxxCL4knFc+/7f6m6pBp9nbWgUbUO4yN+g/CjekWs0yHUOkt42XU9WJpMbD47e7Pup/jkqWWJfqCekccmp6jdXqKY7hnLlMd39BzoLiWMC4RTlfXj8Pf5GnO9vtDmCt+0oEukOEcZO73/rVOaLTp5PS7G4iMpH2sBbg/upTrX0ZrhPPQu7I0RLpButJj2wfYNWTppiliib+4n4wyHkD3cfCmO30eGCNp4D11pMPtrY+sPMeYq1BY2umwCG8LXOiz+pKedux/T8qJQQLTXYr6cl5YXi3dmhM1s328JHFhXQhfSvGHhs7xgwyCIeA+PfUHVR2MixtbG4LJ9jMhyJF+6W/Wi0LJLZxOFkiPFTHKcFSPMUajt6LGnlzgCz3cue3ZX4HiYx9aqftA//AE17/wBP/Wj11AuFDSgcM+tVP0eL98f56nJbwc30i3k1TVYbYMSpYFu7hXYQ4tLKCNR2UCjA+X61y3oU62erBpU27l2r/Fmne+1PblH8KGDy2UJy3SZdFwJYijHO6FgPeCR9Kp6hbxarbPaT5EV3bAhhzVgchh5gkH4UMl1eKPbKeSOc/wALD64obD0higSDJJaCcgDxQ5/Q/hRuLISFc3FxpV9JbakmycKUE8ajtj72DzzRSLUbGZ4zcXg7Ix2eyxPdnP1qx0kmsNXtbmOcbJIZOsglHMA8x7s91c/mkEMjIGDAe0O+q9unjN5Zp6fXTgsZH9NV0uG6QwzII2iCyNIeOQeGAO6oNZ1TSrm9ga2ulig2HrZEfBPljHvpANyua1EyMcLzNJWggpbsssy9Qngf06R6HbJJAnXSoVKKPWwPE+JqlZdJ5rS39G05CFOd0kx3Fv8Ah5D8aVra2kmfbEjORzC8RTToeiw291Zz6mytBKeCA8B3Dd7j3UX41UO+Stb6jNL5DT0ftp76E3eou7Ndgrbux45Hf5A8sURtsxPLbznbFcA7ieSyDv8AiPyrbTEeWO702QbJI262HHdg8QPwNUOl136TZWQiG2S6kInx3FOYpkoqMMooRzqbVuLkHoOVc26TyouDIy5DfCrb6pPKBGsvVKWyAOHD4UPtFURKnD35qWK1Nw295GSAHmAMsfD+teetm5ybkz1VelopjhRGhRp+qQbbyJS+3HWLwbHvoHqujz6bb7beRrjDFoXAJO37rD8jRO1mtreERwQhRjgSc1LBq4WRgxQ8B31a0uslX8XyjLv0am24oXLa/uLSeNiXZHUMviOPFTUqXenvLci6hdo5XGYASy8TjOO6jOs29vqse5MLdxjssPb8jSZbXsMNw63LlNpPE9/kafdrbJPEOh2k0FDre5fIZL3ozoWoq0bRTROgG1o5Dw92ciknpF0Eu7GOS4s7hbqFATgptcD3cQaZ11hoSksISSFmxIrHJUUTjv4b2MLCylGBGG48PD8aRHV2Q7YU9Eo9HBZogrkgj4Grug6ZPrOoR2Vpt3MCWY8kUcyaK9INCsv2jdR28kUbJKw7J+zbv4eB44o9/sqsDa3GrW7ptu3jQRlvuk93zFbtdsZxyjGXM9p7+zzpqPDoUG54xiW9lHb8znko8udB20O71GVmmlublzzK8B/M2c/AV0S8hSe79Ci+ysbVygUcDM4PF2PiTRzq4NKsnvbkhERcnJB4jwqhLWSnNxr6XkbKPBy2P/Z/fsoYWLbeGC0zD9P0ryboVqNuxZLG6wOO+J94HwKj86f26Uz6pELfq2ss/wBzK7AIzdw7yflW+h65NaalFa3uqvO0jEn7ECMjkRnmCPH8KGOqs34yRtwsnOI5b2xYo+87e5gVP8p/QmjWkdJktw0UsYeJx9pDJnDfqp8+I8q6zf6Zp+pwlLmCGUHiG2gkfGkXXv8AZ/G6FtOZ8A+o7cV8wf0PCtNN+ReYvsk0eWN7d5NKf0nTyftbSVtrwH/CeNHbmKKLRjIjOyo4O0tkjPD6VzbozJe6H0lW1uMhiwilB4b1bgDXUb23S6tGsZhJEHPaaJ8HAOedSL2bZJxFx71V7TJnwyx4VF+0ovur/M30q3e9ErMpsjvNQz/4/wDSgbdD49x/+Jahz/e/0ocIs5Yp6HqHpyIzDbcxHJx7a+I/WnO4UXlgJActt5jnXLLOXqdkkRZJEIKuvMV0HozqMN/Bjgkme3Hnv8R76VN+3LK6KllbXKAF3dtbytFNyPee8VQur+HYrAgnkabtd0mG6t96Lx4gnwpCv9GZO0hbhRxuiKVi6ZSvL2WfKliB4A91VOQV+bLwqf0J/ayDWfs9zyzij3x+ztyPbiW1niBMJMmOJU4NDRDI5PVoce+iiacwwTnBq/a2gt7qJGXgx2HPnyqPeigpXccG2jW1zZwwzSArBPkK3du/1roWg9GWv9PjGovLDCZGaNV9bb+medDejumpPPHDdO5hs2DRw8xkkn86YdRi1GTUYGguSloiZZQeJfP0rE1OqbliLwzR0WgV/wDUl14Cd9YATwGzkaAQL6wfi/gGOONWtX0yw1XToxNmOeMF42jbG1vHzoYuomNWSUb2BweFV7jXH6t5YVYiI4Y5HEZxiqULbujY/G6S8C5FLdxauNNlkKyLzfHArzLfKmK+N2r2otFXqQ+JAR7P1pT6T3EBeK6kw6xzDcFbjsJ4jz4UdfV1bS/SLeXrI5M8TzA8KfZXxGaXY2L3Pa2Q6xqMsEo9GbiMbtx8e6hS6w7XbPKwUDPI99Q30zsrlowGxwHOly5eeLtgZPhVmiiLWGDda4M6ro2spe24QSASRtnK8eFKOuukOoXAQ8nJHlXnRS7naWMW8Ds+4mRAB6uO6qesWurwyz3l7YzBHdiSo3BRnvxQwoxY0D7iity8kNvqM0TgqRw4nPHJpu6OXvpFymyF3JftFF9XPj3UhacV1G8WJJBGnN38B5eddU0nqLS0EVtiKNQOI5t5n30GsUYJJrkKuyU4troWrjofqs0k0wa2VndjtMmTxOeNCon1rotq0M8tviWLtqpbckq94yK6NDqcU/WeizRM68NhXmaEdIIjqNgT1fV3AG5GPDae8fGmUap5W9GZP0/GZR7NtO1SC/Y31iyzRyMZHik9dCeJDDw86NRXNpfWM1nPtMbg/Zs2eB7hnwrkd7HLbA6xp6tBAznrYosj0dweOD938qs2fS25Xa10qXQ/eZ2SfMc/iKs/iyrlvr6ZW+M0Fta0W7hukisp3MXIcckUwaZ0elDJcX+pXF4yqMRb+qx49of0pft+l+nyEekRzofNQx+dFYumekhRm4bcvjEeVPjBf3IruMkzo+mPZW1qsNsnVIOO3J51OZl7RUGua/8Ab7Rl4mS4cj2UjI/Oqlz09u7odTpVr1YY43zkfkPrVtPKIa+xj1uzhk6TWd9KQIoUxIBzlfdlUHifyo76QkVyxuwqSlMlck8T/pQPotpsn/zLVrvrrnYcB8bIl78AcB38efnVY9fqV5NdLOoikPYG7GF5D8KlrjgmDyxjkvbEfa9ZED7zmqJvLMkn0mL5ULuNLkIwZ+14hz9aqfs2X97/APsfrQYY/g5VCjbcfrROwnuLPrZYB9siFguM7sccfEZHxoVHnvkwKtwOY5FkB4o24camUc9i+1gftI1mz16zHUt1Nxgb0PInz/HjUGoWWxXV1ww5jHKubJJNpd9JJaOY2jcbCO9SeAPliuldHOkEGsW6214VSYjkeOT5fSqF9Dg90TPsrywFNYAGN8cDzrxLECYxHk3I+fdTPNYPCpSQBkLZRxyIqCSxZ7dZExle/wAxQQUpCMMX0sQVkQjiq7l93I/5860NqbiyVwO1GdjHwPsn/PhRycRxXsM5GY5B2vINz/GqdnKLbU7izkXsXCYHhvXkfzp3tsZGPIV0O53XAutwHpEYzw9teBo/NcbApOGPjSGmsQ6St3FPwWX7WArxKtyIqeLpLBc2YYu5UjDAcCKz9ZoZOzcj0vpt8VVsk+gxJBLdan6VJcbLZB2o8esKHXrPrU4tbCHqwTjsdkAeLY5++qP7YhlMqQGXaRwz3/Smrojp4isRPNwluO15he4UuSlSt0vHRpKUcPaC7roesmnmO91AjHaPVLy8Bk0KZbSysjYW8bunPMjbsny8KdNbdYLaTaFBb1ix50kxWl6IwbpxJJkZGMUdFsrIfJ8CpJQe5Llgu9ubmQ7erwU/xc1od6U8vZjiZjnOab9T0UXFoWCskuMFgOOfCl/o4ix3klvOCJEO0g+NX4TjsckuirLLmkxm6GGbZNFsQtIB7WD8DThKsMVoI3XtbSO3xHlx5/Glm1jjgYNEyhgSwGMUXiu2ubcpcTxIBg4MnaFZc5Zs3RLrj8eQNqPR9dNij1W2t0TP+8QxgFRzw31rxNVgaLbC20c286IWWovJfz2zxEQ7R295YSE54gdwrnWpF9L1i6tGY7EkOw/4e6rKreok93aE+4qI48DO96wuR1UjL2snacfKjMd3btaiNpdrnvZsZPdzrnq6m3WE7UZSMdoZrSS7K+plmbgqg8ab+G5cAS1aa5Cl1rRshfWyqQzTbkIPAZHEn30pPNsOYxgHmByohqokgtupkIaUvufHNX7xQlDmteMcRSZgWSzNyRZjuhjtZrY3aeOKiEG5ckV6LENXPb5I91k0M/WyAAjA7zTj0e1GPTpo5I0iuZydqIUOcnwpPt9OfeNufhRqGGaDrLawTrZyNssysAYwearnvPeflQtp8RIy5sd59avdbk9Bjb7NTi59HG2P+DPtefHFMtlp8CQgGKQd2euYfrXO9LstSgiAj0d3B8JUGfhmivpWtJwbRJOI/fJ9alLA6KwOrQpCuD1+3wE7HH41m6L7kn/Mb60iTXuvEMo0idc+Fwg/WqPpmv8A/wBsu/8Aql+tTgnIrhShOW+YqSN+NXJrYtyUfKqrosfdih3BuLIryLr4d8Z3MgywHMqPpWu4oLdkODuJDKeI5VftQqjgTx7hUdzAsxUwYSRc4TkGz4eBoG88CLaX2hp0HpX2BbamQyk4VyeB9/nTdF1U9q2xwyket4VyC44JGHUqwYhgwwQcUV0nXLrS0dw5aJcdnvAzj4iq+1x5iVP8jdcQdZDJbKNxUl0OO7v/AM+dL2sQyNEk65EsZAb3jvo5Z6jb6ntms51inHHBPZP0odqUd4s7rIpRiOKkcxTI2RfAUcCdPI01w2/LA9x7gayGGORSknDPZJ8PA1eutPldy+3j5VCLadXyV7RopS4Hr+CvaRXIuVgMrthwrRnjkZ5V2qwxHCq8PCuUrFPFNDdBO3FjJI548adLHXxcywiAIyEAsu4bkPurK9RjO1LC6Nb0+xYlGTDl5GszSSynKA4AIzS7dR7mwDsVidpPeatalqDlHjSUIgUkluWPrSRd3LuxL7s54EnuqtpaJSRfts2oadQuJrGJob3Z2k+zYDJ/rSbf3Qh1xJ03DegLBuHGrkmsKbJIpEIMZzluXkfKlTULsz3jzjiCRgeQrW0tD5yZt+oS6Ohpe9ZbbiRjvPhQiS/kF3kK7KGwpyeXlQWw1YbRHLu3EcMCpJ9VhBQ79xQ+rtNRHSuMsYG/lpx7Gm0v5FSY3COCihi7Hw/pSLqt76ZfSzKSVZiRk5OM8KLQzXWopLGpcKRkR55ihp0yTeylSGU4K440+iuNTbZQ1OrVmEukVBctgDHHyreKWdZo5VYrtPAiryaY0YDsMjvFE7O0gXYZBuhc9vxWmuyK6Kcrs8FXUrOSaOOYgEOmUZRwYd4+FCPRyBkZIroKaWtmhtpyJLKXtRSZ5Hux4UJ1DTOrkIOGA5MO+j3cA7hetiVwMfOr0UYcg4z7jUnoJJwAa3fFs4ihXfcHu7k8zSJZk8IjG54R7M4h2wRf3z8yPYX60U0mBQirxHmBxFVLHTDv3yuC5PaO7FHbaCGJ1yy4/ipkUo8FyENqGHStOjaMHrrgnHsnlV59KOci7uOXDs5obZ3kEeMqoA5YogdWsUjLyPH/AMTD60aCZDJpmODXUw8hHu/SqLaQNx/tE3P9yatza1ppjy08S9nhmUD9aGHVtLyf7Wn/AFX9akgXjD/B+H0qCa1Dglhxx5fSteufxHyrbrJT7Q+X9KRgdkHzQmI8Cfj/AKVvBcgDDRo5PPK5ra4Vjkn5VTfIPI0ezKB34fBbup2cbWhSRByRxjHuNV3aAwSRv1lvvXaOs7Sjw4jiPfxrRG7XHhUzMjrtJFRtxwKlXGfJWhM9tsdeyAeEiMCp9xHCmCx6Tsj+i38YmiU9knwPHI8KBiNoieomKE8xjsn3jlUEko3ZliG4e1FlSP0oJVRmyvKhrofIYdP1BN1hdIGb/upDg/A8vyqC7sGt1PWxNuHLhwpHhlZZGa1uQH57X7DZ/I/Ojel9KL+I+jXABHIJJ6rUt12R65Bjuj2bXt5JGGUrhR3GhtrM8E/WQSMjetGQeOPDzpik1PSLsmO8ia0l5ErgjPuJ/WvLPQrKVs2lzHOCcgK+Cv8Awnj+dLdiSe5DldFr+QHqWvX0qtAwTqyBuKjnQmbUZS4AjZlHLNNt10eihnMnbK96lTkVVk0eKPa8YDAnnzqYX0rhI6erl9itP194wLJhQOAFQNaTfcNOzacoCsEx44GKgls/aRQw+7TVqo+CrLUcitbWEu4OoII7xRix0iGRSfb8DzFE4LPOdoz/AIe8Vags5N4aBCx9pQKXZqW+ELla5dFextysiJEQsyeqR3+76UxppUeo2+NnV3qDht9rzB7/AHVQ2WluRJdXkFs49maVAR+NW5ulGjxQKj3SzOORhVmPzxj8ampOXYVcJeSiumyM5j6tUmA4g+q/n769ttLZZg6DYfajccG+NDdT6XxyN9hAzt3PL9B+ppevde1C7yJZ5Np5LuIA+FH7Mm+A/aeTqUslnBZqkkkUC44JI4AHu40t3+taLBwF11xx6kA34+PL8aQ4o5rhtqqWJ7qaND6O8RNcHJ7l2kj8KsbMdsbGvJftQ+oL1iQNaw9245dvw4CrCWEVvnq4seLYOT9aKQwNGoUdVt4YPVNWTQsRyXHiFP1qUkh6gl0D1XB7x8DU0cBbhnz5Gveow3s/Ef8AuqRUQcD1Z8usA/8A6qQghbwxlV+1VJPOJz+lSSQIBj0zB97oPyoaNseSsOc+EvD8AaheWQHgJVXwWVv1WuOL0tvIyHZLEy+Up4/hQprWbce2Of74fWpGvTFyluo//M+uKpNqkm4/a3XP76/+qpOBKLckDhF8XP0rYGbGR1P85+larMpABj5edSrszkLx99KGEcgnUcI4+PM7qj2yYy0YP8Jq2SW5Dl41qd3LbUpgtA55FU9qNx7sVp6TBnBEg+VX5Ig3NcVTlsyTkRk1JB51kJ5F/kKwiJuRb+X+tR9RInsH4GvAePFW+dQSeyWsTjIyx8kqH0Z04I5A+7g4FTZyeO751J1QIJBPuzUbmdtTLKQjVNOZNo9MtUyMf94g5fEUNMEno7SWzsGXjgGrNrcPY3EdxCcPG2QD4d4o3JaxSoL2wwIZOJj+4e8Gkzlt5Kl0NvKA1lr+sWabo7gyR44q3HPzotZ9MbaYgajp4H3pIOyfw+lRLopJLFljTmdxwFoZNb6ZbyNi/wCs7ysEZcfAnA/GhSpt8CeH4GG56T6LGFFsL2dGGT9mF2+RyePwqi3SmwPCLTZj/HKP0FL09/YxcLe0aQj2pm/Qf1qjJeSy8tsY+6igCmR0df0F7SYzP0qkGfR9Ptoz96Qlz+PCheoa5e3xxd3UjL3Rp2V+Q4fOg5JPifjWyITyU0+NMIdIZGCXgl61R6iKPhWu4se0/H3VLFayPyGKvQaYe/NFwMUQeI2Pq8f+E1ZtrMuwMhIH8JozbaUTjgaL2el7cHv+VcGog+xSzt1G6VlbxEZorHf2SBf7fjhyaA0cs9P27AXXOaluLAKXDLCxUZBxwI+dRgLIF/a1iWVkvYlx7Jjx+NTrrVmc/wButvi/9KMnSUaBW2wZIzwB4VQOkwSFgyxx49o47VdtO3EK6pYN697any6z+letqFkRwuLfPlID+tYdCiORiI+YI+lVX0CEMQ0LN741Irtp24mN3E3ETIR/4tQT3CEZWSHPk4J/OoJNDsVY/YRf8s/SqlxpFmPVigH4VOCDeSWcjIaDHnIv1qsZLjPrW384qtJpkQ7PUxe9ZcVVOkxZP2Z/51SQSpx41agGUOT3VlZSGPJQo299TxQq/PPzr2srmcY0Ea92ffUbY8MVlZQ5JwQugIzVaWNR3VlZUohlUAZrGJB4VlZXMFGjKG50wdCXP7ehsyAYJvXQ1lZQT/UC39Sp0+mkTXLu0RitvBgJGOXxpKaRpG7ZyPCsrKs6dLaVong5mpFAzWVlMYSCNvZxHGdx+NFraxt9oOysrKTJj4ovraQqoIWrcNvHkcKysqEEy/HEikYFFraFGiJPNeVZWUQJdjhEiMSzA8DwxWsBaYdVKxYAnBPOsrKIgtuOww5bV4YA8aD38jr2lbBOMnaPpXtZUnMDm/u1mCifhn92n0oik7THbIFPmOB/CsrK4hFeZT1rhXZQvgaq8ZD2iaysriSvdxhY85J94H0oSSMn7NP5aysriGf/2Q==",
    isAvailable: true,
  },
  {
    id: "9",
    name: "Puri",
    price: 30,
    description: "Fragrant rice with tender chicken pieces",
    category: "Main Course",
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAtQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EADsQAAIBAwIEAwYFAgUEAwAAAAECAwAEERIhBTFBURMiYRQycYGRoQYjQrHwFcEzotHh8SRTYoIlNFL/xAAaAQACAwEBAAAAAAAAAAAAAAACAwEEBQAG/8QAJxEAAgMAAgIBBAIDAQAAAAAAAAECAxESIQQxUQUTIkEjMmFxwRT/2gAMAwEAAhEDEQA/ANrhdvZ/0q4fwUKJbMASMZJyB+4pj2Wzt4bCSK3RGYuzAdH8oz8aybO+S6/D6u8fhxXITC5OoDI3q1vxAXVwlskKI6KGBzkMM51fE7fOs/cLnFs27tIWtOISugZXOwGMAasZ/eqv4cYtSmPyiyjfrt/pWeL7Stwl2iiOeUwZXJAGef3ql9dS21tD4s2iSO4CEqoGo6Tn4DlXadh6Hh2Dc3zIgVpoo2k0KTk75+wFKWiNJ+HrhGHlFs4UjbJCn/Ss20vJIJ5XkeSSd4l0LqPMls4x2G1XsJGktYbVpGEbxFFfVkyE8z8cVGk8TXSWQcPgSQeSKcYYbkjQcH+3yoiSo95dQTSCHx2V8EjkRj981kRTLLaWiMzGa0n0SbEBwUJU/tRJI4Pa2nKfmuADjlgZ/uT9aT5HkRpQVVLmWutEtr7Ow/Ot9kYtgMQen0q095qvYZ7bAdYRG2RncEnP3+1Lvbwu5JTcnferJEkeSq7nrWRd9Qul1HovR8aC99jLMT5cZUjDdj8qZj86L4hyI8svoeVJqduYNNqoCkA5yOdU1fPd0Nwj6wKsKG2uI4wNM6FWyd9xjI7VyN7kLbQugaOKQOJCeZOoYPb9P19KkTHK4G5PbamEkVfL+knerdHnWRzXqETpixG14lcXsztLCFa6s1JQg7ENhwR8CtZEfE3l4c0aPGHsXDB9GxXdTz9K9BeQMBG1ntIp1A554w2n5lQK843DJIr72eNTpuHkPhvsTHINWPiGOPlW3XbGyPKJUcM6ZpXt8/tFpb+0A3MigAvgkqNWT8648txbzzWU0z+DGv5eNtDBSw2+GN6zJLWW54XY3ci6JopMCTOCp8xB+wrajtZ73i5nuSiO8SSoVOF1hdLZ9PLy7E0Z2oU/qctyhluVJjQgkBsgKwwAfgdP1rR4q8kEMkcSkIzJLJMjbldOkj03H3pDhFm0PD5mkt8SMziSHppU4B+O2Bt0p5bSVrbh3tErTRTao3UgDYgMB8AQflRJMHUY/CZ2nR55lKmPLxq3MsOvz/vWvcW4RoL0SBZY9R1f9xdJY6vp96bn4clxxJrQDw4G0y6wBjpkA9iaWhsZbnhtxM0gZI4GUKxwQevT0713EnkjNPExwuNXhhM8FyTLFpIBQHcg98EkfKu0xcfh+39mtvHQSYUqCM989T612oxk6jwvFJ5F4f8AkTKtuViVByOTjy+mPvkVpWK3FrPZxkpJPoQtgbFNwc/XFOTpBPYQRzxqXMiY8vulf+KuJUfiD6GClUVMkjcc8fU1x2mdxqYS2UpAZvGZmB5aQGyufjin3R7i34e1ygAZ2D6jjUSpG370ndLE3DpAmc+Ihk354f45p2+fxp7VYmxGmpsKNxy6n51xzEIoL2bi8oOhAqaYWZ8ZAb3tuvXFOcOSaGyjeRg3s8JEYJxuo5/HapEyHieonUoiAGSN9zRrBsQshGpQSPuaXbYq4uT/AETFOTwdt4PCgCl2cli5Y9Sao2rV1phSdA79aGyEbg15e612vmzThFR6RxRuM75G3pXGDlsA6fWjRrkYx56JkDDEdOY+FKWh6cTSQuj3197tmjwnWWxnUOrdfTFCVArK4XYEnHQ/H0qhmMYQ6suxxoHNfnTFmsF9jQZkYamDkE+7+1MRtkFxkdxWfEzSOQf089uVO20baMZ5ZO/WpUW/6oiSQzGC6nseldSD/rYrjG8a6QM89871W1RY0ClmLZPM9O1PRzRyIw+I+NXvFnwly0qWrejMntxPwV4FVfaYH1lTs3lO4+makki5tZ4nUpBLoIAxgHpv6igG/ZL27T2dGuEA5scOGAGR6Zz9DSVvApgv/YVQ+Dnxmf3mKHPy2x9a3+SZU4mrCUF5cwzMFW7OqJmG+GG4PzBqsMy3HDvAkVfFsWUsp6AjSf56VjcZ4pO9jHdqwjngk8MalGwYHS32P3p+K5le8HisFa5gcEgbE4APx5rXadxNm+C21tZiJC2pWQMDvnGRy59aljGkV/LZJsrqjspXI3G/1rInvrkcEZ8qTaMIjEeYlDdz0xn7UpbX9xFc2d6DIZJXaJkc8wfMPpuNu9FpCi8NrhMyG08K6LkxswUrgDmeh+FSvP8AEv6jZ8YuoomVonVJV1OdiwOR9QfrUqNO4mHf31ssVuX0I5kDDCH1/nKh2MkM93N4CxeKxCn8vYY57ZHWsjjNtJdcVFvbEnLLJGeYUsd/oAfkRTvC2NnxC5TDFmJDHGy4AO/xJoQ8DJOjRvFhUcsI3OP1FthTDXMg9nZ43iCSsmhiATjY8vh61hPcy3rQMrGNlC6BjfWGBB+33reu4rji9xbQ2Q1S/wCKc7Abb5+tR2ycQq9+JePwWtsjZEZwV32O5Pfp9627CKaLMc8QicyMWXO4BJI/eneHcGs+CM06gS37Lpec9B2UdB9zQRIfGYkk6yTsN6zfqsuNaj8ljxY7LRliF58qHq355rknlAbc9gaiMcFmGM747V5+TbZeS6Cg7ebqcD1q6EE6GA3JJJ5UJHVgMczzomkCTU+NGMmmQi09ZDCPKVwwXVqIx8KreWxR9SYyNtt67Fl4MoNs4ZsUXCgogb/D3Yd/jTJRWAp4+jtmRGCx2Vsgv1FNLKs8g8HZDvq6Vnsqswj5BvL6b07DIFVIyRpA225Hnn6U6uzVjBmv2FIDeY7DkNudMQqxGkADB2GOdct0W4jBY6WPmHp6Vaxk88kUilHTYH+fKnwri5J/IiUumXuuGWfEGjZ9VvcIAFkQ8wDncdev1NYHEOG31hxV3Bc21wAmtclGyulgR0OB164r0Q3yRyzttTEVwVGlxqXsRW3TLnBcipJOPo8BdQNeWsdo0UhkghDSSAYDaJPMPQjY/M1oXJluoZAkMiiCcrBKhPmJUjb5/XavVy8PSWVpbdmCyuWkUEZXO23p6Vh8LhSKWYSOxw5G7n30OcY2z2pvDAeegHiubXjVuhhkkjvYQ0oC5yyeXJ9cEfSgSxSze0W9ksnj2LS+GdP6lIxz55AINa97JHepw+dG0xyOyg6iSGOD69jTfFSYHXfEk8ZB2x5gQMn5H7V2Ecnog3Bm4tKL/wAUxJJCiqqsMbZJ5+rH6V2n/wAOyNbJc2k0isIZfJnop3A5dq7RcUwXJnylLCe04hHMjRIjb+Zv0nmD/ajW7arniOl9UbkEEZO+nfl6U27E3ixyOpZYQFYgjBzS9oT7Tc5clScHHfHb60sZpLDh/tkPD4rZdcsZABGc5xvv2517m2t4uF2ot4sF8fmOP1GlfwlwtOFcN9rudYuLhQSHkLaFxsACds89ql1fRiQnOvJ/TRSlGqOtnRTmysxzk0mCEZ2I36CiSXIbkhpV21N/+fTvWN58oWw/F9l6mMosMZBjoT3oTyE75NBbUTtyqyJqBznPQ1j/AGn7LmoPauvipq5Z6U7OA4x+k43HL1NZapKpAZW25EUw050/KjUsi0wZR76G7SQkeBHkjmaJcERl86ckjJB/npWbbOwbxQSF71y7udTE5JBOedC5pxz9kcXo69yDIWOAc5FXjuwwwdiCCPWsb2jOwb5UWDXK2By6ml/kg+CN63vFBDofMBg5PvD/AFp72238kjuRJjko/esNEWMALvjuauDnnT4eRNdCZVRZrtxEADTF5cdWrn9TGf8AC/zVmBzkdqtjfkatLzbUsTAdEDbtb8BsglT2zRrmHVNHxC2ICBtdxGOu3vfblWD4iJ8e4pqO5kUhInZMjoatUfVWurO0Is8VPuIC0mhu7W6s4fLIk2tMHTpZWyPqP3rvF+KJN7BcXGIl8bwRqHMsORGe460NuHWc0khlhVWlZWd0ZkZmXkcg9NqbNhb3cVxbXCM8UqrpIPmV1GA2e/8AvV2rz6rOvQmVDj2YHGf6kL+W44NpIlbEoY6hlQACMYx1HyqVpQW7wI0UJRXVyH1nGrscetSrSk86A4I8FbSTXd9PeLgR2y6TuSHY74HwG/0p/wDDkU7eJczQ6VkkLop5kZ2J+PalPw47nXZzxlGJ8Ve+CBkH6V6RnVF0rjArP8zyZVvhHosU1KXbCyTPMxMsjOx3JY5oR043HKqKwqjtk7Vkys5e2XFHC6yY2zRYznd96TJORijo41YwTgd+VRyTCwZwpXIA1dqssR2ZsDPQUvsX1ajmmUdidkB255pbICJHzIJ+FBuLNWGTkHHOmYACcu+Dg+XNEK5HQ9N6XJYRyMGdDb+UEkHkaVaXzYNbF5GSDlQRyxWDdRsk4SJSS48u/KiryXscnqDRAyPoX3v2rYgHhoFH3pSwthbRYYhpG3cim80m2SbxEhQdqtqNUBGKuN+lDFfADCR7mjEMBqztSwbSdqPrzDgjOTR6mgTkeQVLHrg0YsozpGMnbuBQt8aR0q8Ss7EfOpg21iOYxERKQMHOcVtQWuF/LAwBnfmay7OCQYJ8pB51pq0qOdIyAdJOavePHiuUyne9eRYK74eLgqx1Rtjcr+qpTgn6HO3Y8qlaEbcWIq6z5fbWfgTzTu2ZX2HYDbamV2PLPxopQ5ziuacdKzbrHN6zUhFRWEGOfWuadyRV1WrKpIOKqSkMAY8wJBIPausQHAWruo22xU0AjkdWaZF6cQHKKw3YnBp2KF2U45YBNJrlPL171pWoLaeecZxTdTQEngSNEXbO+d9XWrkyF8FTqYZyB1Fdcn3tznfB2NMhdOMHJ2J2oIrXrFNiU0LYycDqc1kXEPhzB9PTY4r0My6wQF/0rFv1ZDuCANt6CyKjL8UNregUJNFFBjOBRVNV2tY5hAaJqxp3xQs9KsoJwPvXRT3ECwhJIBApmGEBNTc+eM1VQulV5sRyo7bQopO+N/rT/t5rF6VUKWzyz60xEyq42z3pdSDp0geVefrR8HYZ3JI2FRFpeiJDQkKKpAJ9c86dgVnTW+oZAPpSturmMeUEZ93tWnE7BQhxjG2Kv0R3tlO150juoL+jV64qUcKzqCiow/8AIVK0FB57KnNHzyRggGaFryaFK5JyatGDjlWJJfo2kgoNEUALlTkGq5U4wMVdfSlYvRxxlznPQVYrzA59xUBG45HvVRsflRRzCDoizz5jnTEeptHhMRg4+NBBOmm4NIi1A+dT5Rj+d6s1YBIdjQHIGTp2OTg0VlOl/LhRy39KXt8vKzKm4HTtRkkDatJOV7dCN8UTivgSdUEAo2+BWRxNyy6c8q33wYWcYOOvXNeevwqrOQMsWABPT0pNv4YkNqevRCNcDfrRlOKEp2q4qoyyy+rrREOrbnQhR4MA8xUxWsB+hm3wr62ztuAedEUhmYnzKMnFB94A7Y9KNGArZbB08v51p7l+gCrSEAIp35k1owRGSDVnccqSij8QLjZdRBz2rWsMRpIvvFuZPL5U6quMn+Qq2WLoa4cPJqBPPFGuVIkDBcZ5kCgRpgroP0NNLqeLSzHUehG4q8o/x4vZRn/bkViuvL5s+lSsi7uktZPDWUueuk7D0rldBeVxOcYaeL1Y8rZ55yaYD5Chc4FIWN7HeW0czBV1gbZyVrQSPBz0rNtUoyyRqxkmtQRMHfG5NGQZznpQVODkUaPJPz3pHv0QyrE6d9jQwxJ9O9WkJJx22q8CalO2TzFTFaySKA6eVhtTFu4Lx5IC5H2rOSQq5zt3HeixXAW6jJwRkbHpViuRzWo9Zb+RDHoUE9AN/n/OtV9lIgdIASRKHwW59wKrC40rggknc8+Z6/SnIQV1Mp1BjlV5YPI1rpddlCeoBcYjUZ82rAyO/KvK8fnNt4adXYu4xvjpXrDJFKr6VCpkn49zXj+Lg3l68pHl91cdh1qp/wCdW2f4G1z4gbdhPGHTOPWj4xzpSFXgBGcDmBTKHWob7Vn+R48qn2ui3GakEG1dViKry5nbvVwnu+opMUzmNWpLvpGPhTttF4kjxP5NAypPX/albCMiStbQGvVcj8spkgczV6uqLimxE3guVZXI6g/StWyRNkI2A2Pal7mMJeHHJsb/ALUaPyq4GcDY0dcftyeibJcoobWIoNgM13x38OQBQZADpBOMnpvQbi7SC21MS5UZIHM15ybjUs1tbXcS6YpXHvDVj41oVVuUk1/Uq42uzt4t0L55Gt4UM0UcjqZNQV8EMBjptUrL4rxuQXCTTaAkkahCFxnHP96lXnm9EqLw8VwmVRY/lxspCe/o06v7mtSx4tOI9U0RZQAw0ZJ5dTjAPpSVhewyRrHFGzeHENW+FJ5Y9fpS8N7m1cBM+GWjz8Pl02pdtFdvU0FCco9o9RZX1vcxCW3Y4PIOuP3rQhyyZyGJ6/3r5xb8U/8AhJdEhE9vHkc9/wCGt38PcYlnLm8YpbqP8WPoe5Hwxmsy36ZOLbrLMfIWfkernUajo5EVW0ZkkU4yAwJHcU5b2csgjntbiKZCA6H9JHcEV0wXqOddoo23ZVJ1E9qqPw/IreuIxXQfpmZeoPGYr7pYkelB04jDBdw259Kdltr2ZyzQSBuR8mBR4reUqsb2pGebEGlfbtcvQ37kUglhcvDPEN/CKb5PLcnP3reYsADEVC6Tty7UhFZ5feLyjblToh3O5O2BnoK0vGp8ixcWsXyypfZBdoDdvlHjRQC43I+9ZptNq2vAGeVTwF7VsU+Kq44io7dPOyWfpQWtWX3a9I9uvagtbr2rrPFjNZIKN7T6PPaWxiQGm4Yi0fMlcgnHblT8luvYUMR+GSV7Y9KxbvpMoy2t9FuPkprssI1gjEgXfPSmUmKr/wCRXnjrSmXJOVVtseYZxTFvDLLIMZJ7AAVEfDtX7RznEeJM0MP/AHeTHG9MparaWsl1fPoiQa2zzIFNWVjHaRiW6YBh3OwrznE+KvxocQtlVo0s7kwhce/jYn/MD6VoVfT4x/kt7fwU5WuT4w9GZJxGa+u5LuJ2WzlRoRGBnwPKxV9vXY+pHakDcQ2vCL7h8YLi0QaG56nQZZfiNx8Qav8Ahm6W3a2SZR4UysXJOy7gBT8Rk/8ANGa0Q8T4raMTh7hwf/bzA/5qsS6CiseGT+KBNNwbgk8SriRJCARnA8uPtipXo4oriXg3D4rclViQqdLY7Dt6VKNNAvT5rwFA3CeHyH3jHv69f701aQRjhcuF5yyufj4hFdqUC9v/AGE/SPGr+TwwFN/ETzZ3zl8H9hXp4UFn+Hb4wkgok+knnsSBXalOf/RaN38KcRubG9trSB/+nk0gxtyGeo7GvqcChs5FSpTau0wLPaLFRnGKowGalSjIK4HaugCpUriCYrlSpUkFGG9BapUoWSgUlAbc1KlIkPiXhRTKo6GvUWNtFBGDGuCRuetSpRUJexXkNmBxC6ku/YnlI/8AsuuF5YGK87YnT+IrhlAAuLRZJF6FhqGfpt8hUqVE/bCguhJ0Wzi4zFCo0QpIyBhnpn+9WuLmRxw65YjxZZPDkI/UCgO/zFSpSGOXs3/wmNS8RyT5bpgB2GAf3JrlSpTIroB+z//Z",
    isAvailable: true,
  },
];

export default function MenuPage() {
  const [menuItems] = useState(dummyMenuItems);
  const router = useRouter();
  const { cartItems, setCartItems ,isAuthenticated} = useAuth();


  useEffect(() => {
    if (!localStorage.getItem("auth")?.trim() && isAuthenticated ) {
      router.push("/login");
    }
  }, []);

  const handleAddItem = (id: string, name: string , price:number) => {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { id, name, quantity: 1,price }]);
    }
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleIncrementItem = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleDecrementItem = (id: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const checkIfPresent = (id: string) => {
    return cartItems.some((item) => item.id === id);
  };
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Our Menu</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems
          .filter((item) => item.isAvailable)
          .map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="font-medium">₹{item.price}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {item.description}
                </p>

                {checkIfPresent(item.id) ? (
                  <div className="flex flex-col gap-2 items-center">
                    <div className="flex justify-center items-center gap-4">
                      <button
                        className="bg-white text-black flex items-center justify-center w-12 h-10 rounded-md"
                        onClick={() => handleDecrementItem(item.id)}
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="number"
                        className="bg-white text-black text-center border border-1 border-black border-solid items-center justify-center w-12 h-10 rounded-lg no-spinners"
                        value={
                          cartItems.find((cartItem) => cartItem.id === item.id)
                            ?.quantity || 0
                        }
                      />{" "}
                      {/* Display quantity */}
                      <button
                        className="bg-white text-black flex items-center justify-center w-12 h-10 rounded-md"
                        onClick={() => handleIncrementItem(item.id)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        handleRemoveItem(item.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      handleAddItem(item.id, item.name ,item.price);
                    }}
                  >
                    Add to Order
                  </Button>
                )}
              </div>
            </Card>
          ))}
      </div>

      <style jsx>{`
        .no-spinners::-webkit-inner-spin-button,
        .no-spinners::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .no-spinners[type="number"] {
          -moz-appearance: textfield; /* Firefox */
        }
      `}</style>
    </div>
  );
}
