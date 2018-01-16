#!/usr/bin/env bash

tickets_file=$1

if [[ $tickets_file == '' ]]; then
    tickets_file='tickets.txt'
fi

if [[ ! -f $tickets_file ]]; then
    echo 'Файл с билетами не найден'
    exit 1
fi

mkdir src src/img src/tickets src/include
cp -r collocore/provision/ .

amount_of_tickets=$(wc -l < $tickets_file | sed 's/ //g')

sed -i.bak "s/<#LAST_TICKET#>/$amount_of_tickets/g" config.tex
rm config.tex.bak

for (( i=1; i <= $amount_of_tickets; i++ ))
do
    touch "src/tickets/$i.tex"
done
