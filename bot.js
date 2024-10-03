const TelegramBot = require('node-telegram-bot-api');
const token = '7414475440:AAHkMyPyqdR24al5xDObvx-c1SZ1jSmULeM';
const bot = new TelegramBot(token, {polling: true});
const userData = {}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name;
console.log(chatId);


  userData[chatId] = {
    name: userName,
    sewingExperience: null,
    sewingGoal: null
  };

  
  bot.sendPhoto(chatId, './logo.jpg');
  bot.sendMessage(chatId, `Давай познакомимся, меня зовут Алёна, я шью нижнее белье с 2018 года, несколько лет я шила белье на заказ, а сейчас у меня офлайн школа шитья в Краснодаре и я записываю подробные видео уроки по шитью белья и одежды.\nРасскажите немного о себе, ${userName}.`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Продолжить', callback_data: 'continue12' }]
      ]
    }
  });
});


bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  if (data === 'continue12') {
    bot.sendMessage(chatId, 'Как давно вы шьете:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Только начала, пару месяцев', callback_data: 'option1' }],
          [{ text: 'Давно шью одежду, вот решила попробовать нижнее белье', callback_data: 'option2' }],
          [{ text: 'Пробовала шить нижнее белье, но что-то не складывалось', callback_data: 'option3' }],
          [{ text: 'Давно шью, хочу узнать что-то новое', callback_data: 'option4' }]
        ]
      }
    });
  }

  if (data.startsWith('option')) {
    let experienceText;
    switch (data) {
      case 'option1':
        experienceText = 'Только начала, пару месяцев';
        break;
      case 'option2':
        experienceText = 'Давно шью одежду, вот решила попробовать нижнее белье';
        break;
      case 'option3':
        experienceText = 'Пробовала шить нижнее белье, но что-то не складывалось';
        break;
      case 'option4':
        experienceText = 'Давно шью, хочу узнать что-то новое';
        break;
    }


    userData[chatId].sewingExperience = experienceText;

    bot.sendMessage(chatId, 'Еще один тест:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Хочу научиться шить для себя', callback_data: 'sal1' }],
          [{ text: 'Шью для себя и семьи', callback_data: 'sal2' }],
          [{ text: 'Хочу шить на заказ и зарабатывать', callback_data: 'sal3' }],
          [{ text: 'Уже шью на заказ', callback_data: 'sal4' }]
        ]
      }
    });
  }

  if (data.startsWith('sal')) {
    let goalText;
    switch (data) {
      case 'sal1':
        goalText = 'Хочу научиться шить для себя';
        break;
      case 'sal2':
        goalText = 'Шью для себя и семьи';
        break;
      case 'sal3':
        goalText = 'Хочу шить на заказ и зарабатывать';
        break;
      case 'sal4':
        goalText = 'Уже шью на заказ';
        break;
    }


    userData[chatId].sewingGoal = goalText;

    

    if (chatId === 499771903) {
      bot.sendMessage(chatId, `Пользователь с именем ${userName} ответил так на вопросы:\n1. Как давно шьете: Давно шью одежду, вот решила попробовать нижнее белье\n2. Ваша цель: Шью для себя и семьи`);
    }

    bot.sendMessage(chatId, 'Самое просто с чего можно начать шить нижнее белье - это трусики. Но они не так просты как кажется. Потому что часто мы можем столкнуться с разными дефектами посадки трусиков, что может привести к дискомфорту в носке или визуальной дисгармонии.', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Продолжить', callback_data: 'continue4' }]
        ]
      }
    });
  }


  if (data === 'continue3') {
    bot.sendMessage(chatId, '🎁 В конце для вас будет бонус - промокод на скидку 50% на размерный ряд трусиков слипов. 48 выкроек за 600₽!!! Размеры от ОБ 82 до 135, размерный шаг - 2 см!!!', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Продолжить', callback_data: 'continue4' }]
        ]
      }
    });
  }

  if (data === 'continue4') {
    bot.sendMessage(chatId, 'Прежде чем мы рассмотрим дефекты посадки и способы их устранения, давайте вспомним с чем вы сталкивались на своем опыте.\nБыло ли у вас такое?', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Перетягивание сзади', callback_data: 'defect1' }],
          [{ text: 'Вываливаются бока', callback_data: 'defect2' }],
          [{ text: 'Натирают', callback_data: 'defect3' }],
          [{ text: 'Напиши свой вариант', callback_data: 'defect4' }]
        ]
      }
    });
  }

  if (data.startsWith('defect')) {
    bot.sendMessage(chatId, 'К чему ведут такие дефекты?\nВ первую очередь к дискомфорту и к не уверенности к себе.\n\n Вам приходится постоянно думать о том, как вы выглядите, не перетяну то ли? Не торчит? Не давит? Не натирает?\n\n О какой уверенности может идти речь, если постоянно надо думать о нижнем белье?\nИз- за каких ошибок могут быть такие дефекты?\n\nДавайте разбираться!', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Продолжить', callback_data: 'continue5' }]
        ]
      }
    });
  }

  if (data === 'continue5') {
    bot.sendPhoto(chatId, '1.png');
    bot.sendMessage(chatId, 'Ошибка 1 - не правильно сняли мерки или определили свой размер.\n\nЕсли мы говорим про выбор своего размера, то вы должны знать.\nСуществует два вида изделий: плечевые и поясные. К поясным изделиям относятся юбки, брюки, трусы и все производные. К плечевым относят - платья, блузки, худи, жакеты и прочее.\n\nИ размерным признаком поясных изделий является ОБ (обхват бедер), а у плечевых -ОГ (обхват груди по выступающим точкам).\n\nЭто значит, мы должны правильно измерить свой ОБ. Затем зайти в таблицу производителя белья или выкроек и посмотреть, какой размер соответствует вашему ОБ. Если мы конструируем самостоятельно, то здесь очень важно правильно снять мерки.\n\nИначе мы будем наблюдать такое ', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Опрос: было у вас такое?', callback_data: 'poll1' }]
        ]
      }
    });
  }
  

  
  if (data === 'poll1') {
    bot.sendPoll(chatId, 'Было у вас такое?', ['Да', 'Нет'])
    bot.sendMessage(chatId, 'Продолжим?', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Продолжить', callback_data: 'continue6' }]
        ]
      }
    });
    
  }
  
  if (data === 'continue6') {
    bot.sendPhoto(chatId, '2.jpeg');
    bot.sendPhoto(chatId, '3.jpeg');
    bot.sendMessage(chatId, 'Ошибка 2 - не учитываем коэффициент растяжимости ткани при конструировании.\n\nЭто приводит к тому, что трусики будут перетягивать или наоборот, будут прям свободные и собираться в паху.\n\nЕсть вторая талия и валики на боках \n\nЕсть валики в паху и на ягодицах ', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Продолжить', callback_data: 'continue7' }]
        ]
      }
    });
  }
  
  

if (data === 'continue7') {
    bot.sendMessage(chatId, 'Ошибка 3 - не правильно подобраны материалы для пошива.\n\nВажно понимать, если вы используете не эластичные материалы, то вам нужно выбирать модели свободной посадки, модели на регуляторах или сочетать с эластичными материалами.');
}


if (data === 'continue7') {
  setTimeout(() => {
    bot.sendMessage(chatId, 'Эта модель - трусики из шелка (не эластичный материал), модель трусики - зефирки свободной посадки')
    .then(() => {
      return bot.sendPhoto(chatId, '4.jpeg');
    })
    .then(() => {
      return bot.sendMessage(chatId, 'Материал на этой модели не эластичная вышивка на сетке - модель на регуляторах.');
    })
    .then(() => {
      return bot.sendPhoto(chatId, '5.jpeg');
    })
    .then(() => {
      return bot.sendMessage(chatId, 'Здесь неэластичный шелк в комбинации с эластичным кружевом. Так же правильно нужно подбирать резинки для обработки срезов, чтобы не было такого:');
    })
    .then(() => {
      return bot.sendPhoto(chatId, '6.png'); 
    })
    .then(() => {
      return bot.sendMessage(chatId, 'Продолжим?', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Продолжить', callback_data: 'watched_material' }]
          ]
        }
      });
    })
    .catch((err) => {
      console.error("Ошибка при отправке сообщений: ", err);
    });
  }, 1000); 
}




if (data === 'watched_material') {
    bot.sendMessage(chatId, 'Для вас я записала подробный видео урок по материаловедению, можете посмотреть его по ссылке:\n\nhttps://disk.yandex.ru/i/vh4PugH8NK65Cg', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Посмотрела', callback_data: 'watched_video' }]
            ]
        }
    });
}


if (data === 'watched_video') {
  bot.sendMessage(chatId, 'Давай проверим пройденный материал.\nТест:');

  bot.sendMessage(chatId, '1. У поясных изделий размерный признак:', {
      reply_markup: {
          inline_keyboard: [
              [{ text: 'а) обхват талии', callback_data: 'test1_a' }],
              [{ text: 'б) обхват груди', callback_data: 'test1_b' }],
              [{ text: 'в) обхват бедер', callback_data: 'test1_c' }]
          ]
      }
  });
}


if (data.startsWith('test1_')) {
  if (data === 'test1_c') {
      bot.sendMessage(chatId, 'Верно! 🎉', {
          reply_markup: {
              inline_keyboard: [
                  [{ text: 'Продолжить', callback_data: 'next_question_2' }]
              ]
          }
      });
  } else {
      bot.sendMessage(chatId, 'Неверно. ❌', {
          reply_markup: {
              inline_keyboard: [
                  [{ text: 'Продолжить', callback_data: 'next_question_2' }]
              ]
          }
      });
  }
}


if (data === 'next_question_2') {
  bot.sendMessage(chatId, '2. У плечевых изделий размерный признак:', {
      reply_markup: {
          inline_keyboard: [
              [{ text: 'а) обхват талии', callback_data: 'test2_a' }],
              [{ text: 'б) обхват груди', callback_data: 'test2_b' }],
              [{ text: 'в) обхват бедер', callback_data: 'test2_c' }]
          ]
      }
  });
}


if (data.startsWith('test2_')) {
  if (data === 'test2_b') {
      bot.sendMessage(chatId, 'Верно! 🎉', {
          reply_markup: {
              inline_keyboard: [
                  [{ text: 'Продолжить', callback_data: 'next_question_3' }]
              ]
          }
      });
  } else {
      bot.sendMessage(chatId, 'Неверно. ❌', {
          reply_markup: {
              inline_keyboard: [
                  [{ text: 'Продолжить', callback_data: 'next_question_3' }]
              ]
          }
      });
  }
}


if (data === 'next_question_3') {
  bot.sendMessage(chatId, '3. Какая резиночка подходит для обработки срезов по ножкам у трусиков?', {
      reply_markup: {
          inline_keyboard: [
              [{ text: 'а) бретельная', callback_data: 'test3_a' }],
              [{ text: 'б) бельевая', callback_data: 'test3_b' }],
              [{ text: 'в) становая', callback_data: 'test3_c' }]
          ]
      }
  });
}


if (data.startsWith('test3_')) {
  if (data === 'test3_b') {
      bot.sendMessage(chatId, 'Верно! 🎉', {
          reply_markup: {
              inline_keyboard: [
                  [{ text: 'Продолжить', callback_data: 'continue_after_test' }]
              ]
          }
      });
  } else {
      bot.sendMessage(chatId, 'Неверно. ❌', {
          reply_markup: {
              inline_keyboard: [
                  [{ text: 'Продолжить', callback_data: 'continue_after_test' }]
              ]
          }
      });
  }
}



if (data === 'continue_after_test') {
  bot.sendPhoto(chatId, './7.png').then(()=>{
    bot.sendMessage(chatId , 'Зеленым - не эластичные строчки \n Красным - эластичные \n Синим - это визуальное прямые строчки, но по факту эластичные.')
  });
  bot.sendMessage(chatId, 'Ошибка 4 - Использование НЕ подходящих швов.\n\nДля пошива нижнего белья нам нужно несколько строчек: прямая, зигзаг, тройной зигзаг - это минимальный набор. \nЗигзаг и тройной зигзаг - это эластичные строчки. \n\nТам, где мы пришиваем резиночки, трикотажную бейку или эластичные тесемки, мы используем только эластичные строчки! \n\nПришивать резинку прямой строчкой НЕЛЬЗЯ 🚫', {
      reply_markup: {
          inline_keyboard: [
              [{ text: 'Продолжить', callback_data: 'photo_sewing' }]
          ]
      }
  });
}



if (data === 'photo_sewing') {
  bot.sendPhoto(chatId, './8.png');
    bot.sendMessage(chatId, '5 ошибка - при выборе модели не учитывается особенности фигуры.\n\nТут, конечно, нужно много опыта и насмотренности. В каких-то случаях понимать как можно (красная линия) и как нельзя (синяя линия).\n Если есть животик и он выглядывает по переду по срезам, то необходимо увеличить длину бокового шва', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Продолжить', callback_data: 'photo_figure' }]
            ]
        }
    });
}


if (data === 'photo_figure') {
  bot.sendMessage(chatId, 'Ошибка 6 - Неправильный раскрой или несоблюдение симметрии.\n\nНесоблюдение рисунка не ведет прямо к явным дефектам посадки, только к визуальной дисгармонии.\n\nВот здесь задние детали не симметричные — посмотрите узор в стыке с ластовицей.')
  .then(() => {
      return bot.sendPhoto(chatId, './9.png');
  })
  .then(() => {
      return new Promise((resolve) => {
          setTimeout(() => {
              bot.sendPhoto(chatId, './10.jpeg'); 
              resolve();
          }, 1000);
      });
  })
  .then(() => {
      return bot.sendMessage(chatId, 'А вот на этих раскрой верный — рисунок совпадает.');
  })
  .then(() => {
      return new Promise((resolve) => {
          setTimeout(() => {
              bot.sendMessage(chatId, 'Также может быть неверный раскрой по сетке, так как она биэластичная — тянется и по долевой, и по поперечной. Часто по долевой тянется больше, и лучше раскладывать выкройку, совмещая долевую по тому краю, который меньше тянется.', {
                  reply_markup: {
                      inline_keyboard: [
                          [{ text: 'Продолжить', callback_data: 'continue11' }]
                      ]
                  }
              });
              resolve();
          }, 3000);
      });
  })
  .catch((err) => {
      console.error("Ошибка при отправке сообщений или фото: ", err);
  });
}


if (data === 'continue11') {
  const photos = [
      './11.jpeg', './13.jpeg', './14.jpeg', './15.jpeg', './16.jpeg',
      './17.jpeg', './18.jpeg', './19.jpeg', './20.jpeg', './21.jpeg'
  ];

  const sendPhotosSequentially = (index) => {
      if (index < photos.length) {
          bot.sendPhoto(chatId, photos[index]).then(() => {
              sendPhotosSequentially(index + 1); 
          });
      } else {
          
          bot.sendMessage(chatId, 'Продолжим?', {
              reply_markup: {
                  inline_keyboard: [
                      [{ text: 'Продолжить', callback_data: 'continue8' }]
                  ]
              }
          });
      }
  };

  
  sendPhotosSequentially(0);


  bot.sendMessage(chatId, 'Чтобы научиться шить идеальные трусики, приглашаю вас на «Практикум по трусикам».\n\nДоступ к урокам навсегда 🔥 все видео вы можете просматривать в закрытом ТГ в любое удобное время!\n\nЧему вы научитесь:\n✂️ правильно снимать мерки;\n✂️ построению базовой выкройки трусиков-слипов;\n✂️ моделирование 6 разных моделей и сошьете 11 трусиков: бразилиана из сетки и кружева, галочки из сетки и кружева, на регуляторах классические и регулировка по переду, на регуляторах из хлопка, трусики с доступом, трусики зефирки, трусики-воланы 😻\n✂️ пошив всех трусиков с использованием разных технологий обработки срезов;\n✂️ научитесь разбираться в материалах для пошива нижнего белья, получите список онлайн магазинов для закупки материалов.\n\nУ вас будут очень подробные видео уроки по конструированию, раскрою и пошиву!\n\nПомимо этого у вас будут:\n✔️ видео уроки как заправлять машинку и оверлок\n✔️ конспекты по конструированию\n✔️ видео урок по обработке эластичных тканей без оверлока\n✔️ ссылки на ВБ по инструментам\n✔️ табличка с ГОСТовскими размерами\n\nПоэтому на Практикум можно прям с нуля! https://taplink.cc/lofka/p/e69e62/ \n\nВот примеры трусиков, которые вы научитесь моделировать и шить с нуля!', {
      reply_markup: {
          inline_keyboard: [
              [{ text: 'Продолжить', callback_data: 'continue8' }]
          ]
      }
  });
}




if (data === 'continue8') {

  bot.sendMessage(chatId, 'Чтобы научиться шить идеальные трусики, приглашаю вас на «Практикум по трусикам». Доступ к урокам навсегда 🔥 все видео вы можете просматривать в закрытом ТГ в любое удобное время!\n\nСсылка на Практикум: https://taplink.cc/lofka/p/e69e62/');


  setTimeout(() => {
    bot.sendMessage(chatId, 'Продолжим?', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Продолжить', callback_data: 'promo_code' }]
        ]
      }
    });
  }, 1000);
}


if (data === 'promo_code') {

  bot.sendMessage(chatId, 'Если вам самим конструировать не хочется, то вы можете купить базовые выкройки и моделировать их.\n\nКак и обещала, вот вам промокод на скидку 50% на размерный ряд базовых выкроек слипов.\n\nПромокод - ЛОФКА50 \n\n https://taplink.cc/lofka/p/d95a0c/', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Продолжить', callback_data: 'end' }]
      ]
    }
  });


}


if (data === 'end') {

  bot.sendMessage(chatId, 'Подписывайтесь на наш телеграмм канал: https://t.me/lofka_krd\nБольше анонсов и интересных курсов по шитью и стилю 🙌🏻');
}

  

});
