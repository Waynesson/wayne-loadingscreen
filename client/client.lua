local Ran = false

function HideDefaultLoadingScreenText()
    BeginScaleformMovieMethod(GetLoadingScreenLoadingScreenId(), "HIDE_LOADING_SCREEN_TEXT")
    EndScaleformMovieMethod()
end

CreateThread(function()
    while true do
        Wait(0)
        HideDefaultLoadingScreenText()
    end
end)

AddEventHandler("playerSpawned", function ()
    if not Ran then
        ShutdownLoadingScreenNui()
        Ran = true
    end
end)