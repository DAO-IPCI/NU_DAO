import vuetify_en from 'vuetify/es5/locale/en';
import vuetify_ru from 'vuetify/es5/locale/ru';

export default {
  en: {
    $vuetify: vuetify_en,
    title: 'NU DAO',
    desc_page:
      'Nazarbayev University market system model for greenhouse gases emission reduction',
    menu: {
      marketplace: 'Marketplace',
      publications: 'Publications',
      statistics: 'Statistics',
      add: 'Add',
      login: 'Login',
      logout: 'Logout'
    },
    map: {
      title: 'Carbon balance (to same month in 2018)',
      more: 'more'
    },
    statistics: {
      current_rating: 'This month tops',
      all_rating: 'All time tops',
      ghg: 'Ejection CO2, тонн',
      electricity: 'Electricity comsumed, кВт*ч',
      finance: 'Balance, ₸',
      carbon_balance: 'Carbon balance, tCO2'
    },
    resume: {
      title: 'Leaders of the Month',
      enemy: 'Fossil of the Month',
      friend: 'Friend of Month'
    },
    news: {
      publications: 'Publications'
    }
  },
  ru: {
    $vuetify: vuetify_ru,
    title: 'НУ ДАО',
    desc_page:
      'Модель рыночной системы снижения выбросов парниковых газов Назарбаев Университета',
    menu: {
      marketplace: 'Торговая площадка',
      publications: 'Публикации',
      statistics: 'Статистика',
      add: 'Добавить',
      login: 'Войти',
      logout: 'Выйти'
    },
    map: {
      title: 'Углеродный баланс (к тому же месяцу 2018)',
      more: 'подробнее'
    },
    statistics: {
      current_rating: 'Текущий рейтинг',
      all_rating: 'Рейтинг за все время',
      ghg: 'Выбросов CO2, тонн',
      electricity: 'Потреблено электроэнергии, кВт * ч',
      finance: 'Баланс, ₸',
      carbon_balance: 'Углеродный баланс, tCO2'
    },
    resume: {
      title: 'Лидеры месяца',
      enemy: 'Поджигатель месяца',
      friend: 'Друг месяца'
    },
    news: {
      publications: 'Публикации'
    }
  }
};
