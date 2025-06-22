#!/bin/bash

# Скрипт для очистки кеша фронтенда
# Использование: ./clear-cache.sh [key] [host]

HOST=${2:-"localhost:3000"}
KEY=$1

if [ -z "$KEY" ]; then
    echo "🧹 Очищаем весь кеш на $HOST..."
    RESPONSE=$(curl -s -X POST "http://$HOST/api/clear-cache")
else
    echo "🧹 Очищаем кеш '$KEY' на $HOST..."
    RESPONSE=$(curl -s -X POST "http://$HOST/api/clear-cache" \
        -H "Content-Type: application/json" \
        -d "{\"key\": \"$KEY\"}")
fi

# Проверяем ответ
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Кеш успешно очищен!"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
    
    # Тестируем категории после очистки
    echo ""
    echo "🔍 Тестируем загрузку категорий..."
    TEST_RESPONSE=$(curl -s "http://$HOST/api/test-categories")
    
    if echo "$TEST_RESPONSE" | grep -q '"success":true'; then
        CATEGORIES_COUNT=$(echo "$TEST_RESPONSE" | grep -o '"length":[0-9]*' | cut -d':' -f2)
        echo "✅ Категории загружаются корректно: $CATEGORIES_COUNT элементов"
    else
        echo "❌ Проблема с загрузкой категорий:"
        echo "$TEST_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$TEST_RESPONSE"
    fi
else
    echo "❌ Ошибка при очистке кеша:"
    echo "$RESPONSE"
    exit 1
fi 