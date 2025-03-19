import csv



data = [
    {
        "id": 1,
        "name": "Laab kai chicken salad",
        "price": 10,
        "nuts": True,
        "image": "https://course-jsbasic.javascript.ru/assets/products/laab_kai_chicken_salad.png",
        "vegeterian": False,
        "spiciness": 2,
        "categoryId": 1
    },
    {
        "id": 2,
        "name": "Som tam papaya salad",
        "price": 9.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/som_tam_papaya_salad.png",
        "vegeterian": True,
        "spiciness": 0,
        "categoryId": 1
    },
    {
        "id": 3,
        "name": "Tom yam kai",
        "price": 7,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/tom_yam.png",
        "vegeterian": False,
        "spiciness": 3,
        "categoryId": 2
    },
    {
        "id": 4,
        "name": "Tom kha kai",
        "price": 7,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/tom_kha.png",
        "vegeterian": False,
        "spiciness": 3,
        "categoryId": 2
    },
    {
        "id": 5,
        "name": "Tom kha koong",
        "price": 8,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/tom_kha.png",
        "vegeterian": False,
        "spiciness": 2,
        "categoryId": 2
    },
    {
        "id": 6,
        "name": "Tom yam koong",
        "price": 8,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/tom_yam.png",
        "vegeterian": False,
        "spiciness": 4,
        "categoryId": 2
    },
    {
        "id": 7,
        "name": "Tom yam vegetarian",
        "price": 7,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/tom_yam.png",
        "vegeterian": True,
        "spiciness": 1,
        "categoryId": 2
    },
    {
        "id": 8,
        "name": "Tom kha vegetarian",
        "price": 7,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/tom_kha.png",
        "vegeterian": True,
        "spiciness": 1,
        "categoryId": 2
    },
    {
        "id": 9,
        "name": "Sweet 'n sour chicken",
        "price": 14,
        "nuts": True,
        "image": "https://course-jsbasic.javascript.ru/assets/products/sweet_n_sour.png",
        "vegeterian": False,
        "spiciness": 2,
        "categoryId": 3
    },
    {
        "id": 10,
        "name": "Chicken cashew",
        "price": 14,
        "nuts": True,
        "image": "https://course-jsbasic.javascript.ru/assets/products/chicken_cashew.png",
        "vegeterian": False,
        "spiciness": 1,
        "categoryId": 3
    },
    {
        "id": 11,
        "name": "Kai see ew",
        "price": 14,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/kai_see_ew.png",
        "vegeterian": False,
        "spiciness": 4,
        "categoryId": 3
    },
    {
        "id": 12,
        "name": "Beef massaman",
        "price": 14.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/beef_massaman.png",
        "vegeterian": False,
        "spiciness": 2,
        "categoryId": 4
    },
    {
        "id": 13,
        "name": "Seafood chu chee",
        "price": 16,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/chu_chee.png",
        "vegeterian": False,
        "spiciness": 2,
        "categoryId": 5
    },
    {
        "id": 14,
        "name": "Penang shrimp",
        "price": 16,
        "nuts": True,
        "image": "https://course-jsbasic.javascript.ru/assets/products/red_curry.png",
        "vegeterian": False,
        "spiciness": 4,
        "categoryId": 5
    },
    {
        "id": 15,
        "name": "Green curry veggies",
        "price": 12.5,
        "nuts": True,
        "image": "https://course-jsbasic.javascript.ru/assets/products/green_curry.png",
        "vegeterian": True,
        "spiciness": 0,
        "categoryId": 6
    },
    {
        "id": 16,
        "name": "Tofu cashew",
        "price": 12.5,
        "nuts": True,
        "image": "https://course-jsbasic.javascript.ru/assets/products/tofu_cashew.png",
        "vegeterian": True,
        "spiciness": 0,
        "categoryId": 6
    },
    {
        "id": 17,
        "name": "Red curry veggies",
        "price": 12.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/red_curry_vega.png",
        "vegeterian": True,
        "spiciness": 4,
        "categoryId": 6
    },
    {
        "id": 18,
        "name": "Krapau tofu",
        "price": 12.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/krapau_vega.png",
        "vegeterian": True,
        "spiciness": 0,
        "categoryId": 6
    },
    {
        "id": 19,
        "name": "Prawn crackers",
        "price": 2.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/kroepoek.png",
        "vegeterian": False,
        "spiciness": 1,
        "categoryId": 7
    },
    {
        "id": 20,
        "name": "Fish cakes",
        "price": 6.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/fish_cakes.png",
        "vegeterian": False,
        "spiciness": 1,
        "categoryId": 7
    },
    {
        "id": 21,
        "name": "Chicken satay",
        "price": 6.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/sate.png",
        "vegeterian": False,
        "spiciness": 1,
        "categoryId": 7
    },
    {
        "id": 22,
        "name": "Satay sauce",
        "price": 1.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/satesaus.png",
        "vegeterian": False,
        "spiciness": 2,
        "categoryId": 7
    },
    {
        "id": 23,
        "name": "Shrimp springrolls",
        "price": 6.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/koong_hom_pha.png",
        "vegeterian": False,
        "spiciness": 3,
        "categoryId": 7
    },
    {
        "id": 24,
        "name": "Mini vegetarian spring rolls",
        "price": 6.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/mini_vega_springrolls.png",
        "vegeterian": False,
        "spiciness": 2,
        "categoryId": 7
    },
    {
        "id": 25,
        "name": "Chicken springrolls",
        "price": 6.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/chicken_loempias.png",
        "vegeterian": False,
        "spiciness": 2,
        "categoryId": 7
    },
    {
        "id": 26,
        "name": "Thai fried rice",
        "price": 7.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/fried_rice.png",
        "vegeterian": False,
        "spiciness": 2,
        "categoryId": 8
    },
    {
        "id": 27,
        "name": "Fresh prawn crackers",
        "price": 2.5,
        "nuts": False,
        "image": "https://course-jsbasic.javascript.ru/assets/products/kroepoek.png",
        "vegeterian": False,
        "spiciness": 1,
        "categoryId": 8
    }
]

with open("dishes.csv", "w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["id", "name", "price", "nuts", "image", "vegeterian", "spiciness", "categoryId"])

    writer.writeheader()

    writer.writerows(data)
