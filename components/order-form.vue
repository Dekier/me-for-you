<template>
  <div class="OrderForm__main-container">
    <label for="email" class="OrderForm__label">Email</label>
    <input
      id="email"
      v-model="email"
      type="email"
      placeholder="Email"
      class="OrderForm__input"
    />
    <label for="phone" class="OrderForm__label">Nr telefonu</label>
    <input
      id="phone"
      v-model="phoneNumber"
      type="phone"
      placeholder="Numer komórki"
      class="OrderForm__input"
    />
    <label for="productType" class="OrderForm__label">Typ productu</label>
    <select
      id="productType"
      v-model="selectedProductType"
      class="OrderForm__select"
    >
      <option v-for="data in productTypeList" :key="data" :value="data">
        {{ data }}
      </option>
    </select>
    <label v-if="selectedProductType" for="productCode" class="OrderForm__label"
      >Kod productu</label
    >
    <select
      v-if="selectedProductType"
      id="productCode"
      v-model="selectedCode"
      class="OrderForm__select"
    >
      <option v-for="data in codesList" :key="data" :value="data">
        {{ data }}
      </option>
    </select>
    <label v-if="selectedCode" for="count" class="OrderForm__label"
      >Ilość "sztuk"</label
    >
    <select
      v-if="selectedCode"
      id="count"
      v-model="selectedCount"
      class="OrderForm__select"
    >
      <option
        v-for="data in productCountList"
        :key="data.id"
        :value="data.name"
      >
        {{ data.name }}
      </option>
    </select>
    <label v-if="selectedCount" for="information" class="OrderForm__label"
      >Masz jakieś pytanie?</label
    >
    <textarea
      v-if="selectedCount"
      id="information"
      v-model="information"
      class="OrderForm__label"
    ></textarea>
    <button v-if="isValidForm" class="OrderForm__submit" @click="sendRecord">
      Wyślij zamówienie
    </button>
  </div>
</template>
<script setup lang="ts">
const selectedProductType = ref<string>("");
const selectedCode = ref<string>("");
const selectedCount = ref<string>("");
const email = ref<string>("");
const phoneNumber = ref<string>("");
const information = ref<string>("");
const productTypeList = ref<string[]>([]);
const response = ref<any>(null);
const getData = async () => {
  response.value = await $fetch("/api/notion");
  productTypeList.value = response.value.productTypeList;
  console.log(productTypeList.value);
};
getData();

const dataByProductType = computed(() => {
  switch (selectedProductType.value) {
    case "Podkładka":
      return response.value.padData;

    default:
      return {};
  }
});

const codesList = computed(() => {
  return dataByProductType.value.map(
    (data: any) => data.code.title[0].plain_text
  );
});

const productDataByCode = computed(() => {
  return dataByProductType.value
    ? dataByProductType.value.find(
        (data: any) => data.code.title[0].plain_text === selectedCode.value
      )
    : "";
});

const productCountList = computed(() => {
  if (response.value && productDataByCode.value) {
    return productDataByCode.value.count.multi_select;
  }
});

const isValidForm = computed(() => {
  return (
    selectedProductType.value &&
    selectedCode.value &&
    selectedCount.value &&
    email.value
  );
});

const sendRecord = () => {
  const data = {
    properties: {
      orderCode: {
        title: [
          {
            text: {
              content: `${selectedCode.value}-${makeid(5)}`,
            },
          },
        ],
      },
      email: {
        rich_text: [
          {
            text: {
              content: email.value,
            },
          },
        ],
      },
      phone: {
        rich_text: [
          {
            text: {
              content: phoneNumber.value,
            },
          },
        ],
      },
      count: {
        number: parseInt(selectedCount.value),
      },
      cupCoaster: {
        relation: [
          {
            id: productDataByCode.value.id.rich_text[0].plain_text,
          },
        ],
      },
      status: {
        select: {
          name: "Nowe",
        },
      },
      information: {
        rich_text: [
          {
            text: {
              content: information.value,
            },
          },
        ],
      },
    },
  };
  const response = $fetch("/api/notion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response);
};

const makeid = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters
      .charAt(Math.floor(Math.random() * charactersLength))
      .toUpperCase();
    counter += 1;
  }
  return result;
};
</script>
<style lang="scss">
@import "order-form";
</style>
