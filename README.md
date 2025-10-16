# Centrum Dietoterapii Medycznej - Strona WWW

Profesjonalna strona internetowa dla Centrum Dietoterapii Medycznej specjalizującego się w leczeniu otyłości i przygotowaniu do operacji bariatrycznych.

## 📋 Opis projektu

Projekt składa się z dwóch wersji strony:
- **index.html** - Strona główna skierowana do pacjentów szukających pomocy w leczeniu otyłości
- **wsparcie-operacji.html** - Strona dedykowana pacjentom przygotowującym się do operacji bariatrycznej

## 🎨 Technologie

- **HTML5** - semantyczny markup
- **CSS3** - nowoczesne style z animacjami
- **JavaScript** - interaktywność i dynamiczne elementy
- **AOS** (Animate On Scroll) - animacje przy przewijaniu
- **GSAP** - zaawansowane animacje
- **Google Fonts** - czcionki Montserrat i Poppins

## 📁 Struktura projektu

```
cdm/
├── Assets/
│   ├── css/
│   │   ├── style.css          # Główne style
│   │   └── style-wow.css      # Dodatkowe animacje i efekty
│   ├── images/                # Wszystkie obrazy używane na stronie
│   └── favicon/               # Ikony favicon w różnych rozmiarach
├── index.html                 # Strona główna
├── wsparcie-operacji.html     # Strona dla kandydatów do operacji
├── cdm-prezentacja.html       # Prezentacja projektu dla klienta
├── cdm-wireframe.html         # Wireframe strony
├── script.js                  # Skrypty dla strony głównej
├── script-v2.js               # Skrypty dla wsparcie-operacji.html
├── med_style.json             # Definicje kolorów i stylów
├── .gitignore                 # Pliki ignorowane przez Git
└── README.md                  # Ten plik
```

## 🚀 Ostatnie zmiany (2024-10-16)

### Reorganizacja struktury plików

✅ **Utworzona struktura katalogów Assets:**
- `Assets/css/` - pliki stylów
- `Assets/images/` - grafiki i obrazy
- `Assets/favicon/` - pliki favicon

✅ **Przeniesione pliki:**
- Wszystkie pliki CSS do `Assets/css/`
- Wszystkie obrazy (PNG, JPG, JPEG, WEBP) do `Assets/images/`
- Pliki favicon z `favicon_io/` do `Assets/favicon/`

✅ **Zaktualizowane ścieżki w plikach HTML:**
- Linki do CSS
- Linki do obrazów
- Linki do favicon
- Meta tagi Open Graph

### Zmiana nazwy pliku

✅ **wersja2.html → wsparcie-operacji.html**

Zaktualizowane zależności:
- Link w floating button w `index.html`
- Atrybut `data-page` w `wsparcie-operacji.html`
- Meta tagi (og:url, canonical)
- Selektory CSS w `Assets/css/style.css`
- Komentarze w `script-v2.js`

## 🎯 Funkcjonalności

### Strona główna (index.html)

- Animowane tło z gradientowymi kulami
- Responsywne menu mobilne z hamburgerem
- Sekcje:
  - Hero z animowanym tytułem
  - Problem - opis wyzwań pacjentów
  - Przewodnik - kim jesteśmy
  - Plan współpracy - 3 kroki
  - Rozwiązania - nasze specjalizacje
  - Wyróżniki - co nas wyróżnia
  - Rezultaty - oczekiwane efekty
  - Quiz kwalifikacyjny
  - Kontakt z formularzem
- Floating button do strony wsparcie-operacji

### Strona wsparcie operacji (wsparcie-operacji.html)

- Dedykowana dla pacjentów przed operacją bariatryczną
- Sekcje:
  - Hero z dedykowanym przekazem
  - Problem - choroby współistniejące
  - Specjalista - prezentacja dietetyka
  - Plan - 4 kroki przygotowania
  - Porównanie: z nami vs. bez przygotowania
  - Narzędzia do generowania leadów:
    - Kalkulator kwalifikacji (BMI + choroby)
    - Quiz "Czy operacja jest dla mnie?"
    - Konsultacja online (15 min)
    - E-book do pobrania
- Floating button powrotu do strony głównej

## 🎨 Paleta kolorów

```css
--niebieski-glowny: #2B5F8A;
--niebieski-jasny: #7BB4D9;
--bialy: #FFFFFF;
--rozowy-ilustracje: #E85D75;
--niebieski-pastelowy: #E6F2F9;
--czarny: #1A1A1A;
--szary: #6B7280;
```

## 📱 Responsywność

Strona jest w pełni responsywna z punktami przerwania:
- Desktop: > 1024px
- Tablet: 601px - 1024px
- Mobile: ≤ 600px
- Small mobile: ≤ 380px

### Optymalizacje mobilne:
- Hamburger menu z overlay
- Uproszczone animacje na mobile
- Dostosowane rozmiary czcionek
- Ukryte hexagon pattern dla lepszej wydajności
- Touch-friendly buttons

## 🔗 SEO & Meta tagi

Każda strona zawiera:
- Meta description i keywords
- Open Graph tags dla social media
- Twitter Card tags
- Canonical URLs
- Favicon w różnych rozmiarach
- Structured data ready

## 📄 Pliki pomocnicze

- **cdm-prezentacja.html** - Prezentacja strategii komunikacji dla klienta
- **cdm-wireframe.html** - Szkic struktury strony
- **med_style.json** - Definicje stylistyczne w formacie JSON

## 🚀 Jak uruchomić

1. Sklonuj repozytorium:
```bash
git clone https://github.com/ikreacja/cdm.git
```

2. Otwórz `index.html` w przeglądarce lub użyj lokalnego serwera:
```bash
# Przykład z Python
python -m http.server 8000

# Przykład z Node.js
npx http-server
```

3. Otwórz w przeglądarce: `http://localhost:8000`

## 📧 Kontakt

**Centrum Dietoterapii Medycznej**
- Telefon: +48 695 003 046
- Email: kontakt@cdm.edu.pl
- WWW: https://cdm.edu.pl

## 👨‍💻 Autor projektu

Projekt wykonany przez: [iKreacja](https://ikreacja.pl)

## 📝 Licencja

© 2024 Centrum Dietoterapii Medycznej. Wszystkie prawa zastrzeżone.
