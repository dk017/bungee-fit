interface CityContentProps {
    name: string;
    state: string;
    studioCount: number;
    uniqueFeatures: string[];
    nearbyCity?: string;
  }

  export const generateCityIntro = ({
    name,
    state,
    studioCount,
    uniqueFeatures,
  }: CityContentProps): string[] => {
    const studioText = studioCount === 1
      ? "has one verified bungee fitness studio"
      : `offers ${studioCount} different locations for bungee fitness enthusiasts`;

    return [
      "Bungee workout, or bungee fitness, has become a sensation across the United States, captivating fitness enthusiasts globally with its gravity-defying movements and exhilarating cardio benefits.",

      "The trend has taken social media by storm, with everyone eager to try it. Beyond mere entertainment, bungee training offers a comprehensive cardiovascular exercise, with just 15 minutes on a bungee cord proving more effective than a traditional 45-minute cardio session.",

      `${name}, ${state} currently ${studioText}. ${uniqueFeatures.join(' ')}`,

      `In this comprehensive guide, we'll explore the bungee fitness options in ${name}, providing you with verified, up-to-date information about class offerings, pricing, and what to expect from your first session.`,

      `Moving forward, we'll provide in-depth insights into bungee classes, programs, pricing, schedules, locations, and the prerequisites for engaging in this unique form of exercise. So, buckle up as we dive into the exciting world of bungee fitness in ${name}.`
    ];
  };

  export const generateCityConclusion = ({
    name,
    state,
    studioCount,
    nearbyCity,
  }: CityContentProps): string[] => {
    const studioText = studioCount === 1
      ? "While there may be limited options"
      : `With ${studioCount} studios to choose from`;

    const paragraphs = [
      `${studioText}, bungee fitness in ${name} offers a unique and exciting way to transform your workout routine. Each studio we've reviewed provides professional instruction and a supportive environment for both beginners and experienced fitness enthusiasts.`,

      `Whether you're looking to try your first bungee class or advance your aerial fitness journey, these studios provide everything needed for a safe and exhilarating experience. The combination of professional instruction, state-of-the-art equipment, and supportive community makes ${name}'s bungee fitness scene truly special.`,

      `Remember to book your sessions in advance and always check the studio's weight and age requirements before your first class. Most studios offer introductory packages or trial classes, making it easy to start your bungee fitness journey.`
    ];

    if (nearbyCity) {
      paragraphs.push(`Planning to travel? Check out our guide to bungee fitness in ${nearbyCity}!`);
    }

    return paragraphs;
  };