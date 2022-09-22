using AutoMapper;
using backend.Models;

namespace backend;

public class MapperConfig : Profile {
    public MapperConfig() {
        CreateMap<Developer, DeveloperDTO>();
        CreateMap<Game, GameDTO>();
        CreateMap<Publisher, PublisherDTO>();
        CreateMap<Platform, PlatformDTO>();
        CreateMap<GamesOnPlatform, GopDTO>();
    }
}